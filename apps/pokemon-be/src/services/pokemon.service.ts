import { Inject, Injectable } from '@nestjs/common';
import * as csv from 'csv-parser';
import { createReadStream, unlinkSync } from 'fs';
import { PageInfo } from 'src/common/dtos/pagination-result.dto';
import { IPokemonRepository } from 'src/contracts/repository-contracts/pokemon-repository.interface';
import { IPokemonService } from 'src/contracts/service-contracts/pokemon-service.interface';
import { GetPokemonQueries } from 'src/controllers/pokemon/get-pokemon-list.request';
import { PokemonListResponse } from 'src/controllers/pokemon/get-pokemon-list.response';
import { NotFoundPokemonError } from 'src/controllers/pokemon/not-found-pokemon.error';
import { ImportPokemonResponse } from 'src/controllers/pokemon/total-uploaded.response';
import { Pokemon } from 'src/models/pokemon.model';
import { either } from 'src/utils/either';
import { Between, ILike, Like } from 'typeorm';

@Injectable()
export class PokemonService implements IPokemonService {
  constructor(
    @Inject(IPokemonRepository)
    private readonly pokemonRepository: IPokemonRepository,
  ) {}

  public async importPokemonList(file: Express.Multer.File) {
    if (file.mimetype !== 'text/csv') {
      return new ImportPokemonResponse(0);
    }

    const results: Array<Partial<Pokemon>> = [];

    await new Promise<void>((resolve, reject) => {
      createReadStream(file.path)
        .pipe(csv())
        .on('data', (data) => {
          // fix '"id"'
          for (const [key, value] of Object.entries(data)) {
            if (key.includes('id')) {
              data.id = +value;
            }
          }
          const pokemon: Partial<Pokemon> = {
            id: data.id,
            total: +data.total,
            hp: +data.hp,
            attack: +data.attack,
            defense: +data.defense,
            spAttack: +data.spAttack,
            spDefense: +data.spDefense,
            speed: +data.speed,
            generation: +data.generation,
            isLegendary: data.legendary?.includes('false') ? false : true,
            image: data.image,
            name: data.name,
            type1: data.type1,
            type2: data.type2,
            ytbUrl: data.ytbUrl,
          };

          return results.push(pokemon);
        })
        .on('end', () => {
          unlinkSync(file.path);
          resolve();
        })
        .on('error', (err) => {
          console.error('Error while reading the file:', err);
          reject(err);
        });
    });

    if (results.length === 0) return new ImportPokemonResponse(0);

    const totalSaved = await this.pokemonRepository.saveMany(results, {
      chunk: 100,
    });

    return new ImportPokemonResponse(totalSaved.length);
  }

  public async getPokemonDetails(id: number) {
    const pokemon = await this.pokemonRepository.findOneById(id);

    if (!pokemon) {
      return either.error(new NotFoundPokemonError({ id: id }));
    }

    return either.of(pokemon);
  }

  public async getPokemonListOnDemand(queries: GetPokemonQueries) {
    let { isLegendary, limit, maxSpeed, minSpeed, name, page, type } = queries;
    const _limit = +limit;
    const _page = +page;
    minSpeed = +minSpeed;
    maxSpeed = +maxSpeed;

    const [data, count] = await this.pokemonRepository.findAndCount({
      where: {
        isLegendary,
        speed: minSpeed && maxSpeed ? Between(minSpeed, maxSpeed) : undefined,
        name: name ? ILike(`%${name}%`) : undefined,
        type1: type,
        type2: type,
      },
      take: limit ? _limit : 20,
      skip: page ? (_page - 1) * _limit : 0,
      order:
        minSpeed && maxSpeed
          ? {
              speed: 'ASC',
            }
          : undefined,
      cache: true,
    });

    // calculate page info
    const lastPage = Math.ceil(count / _limit);
    const pageInfo = new PageInfo({
      total: count,
      currentPage: _page,
      hasNextPage: _page < _limit,
      lastPage,
      perPage: _limit,
    });

    return new PokemonListResponse(data, pageInfo);
  }
}

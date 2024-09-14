import { Inject, Injectable } from '@nestjs/common';
import * as csv from 'csv-parser';
import { createReadStream, unlinkSync } from 'fs';
import { IPokemonRepository } from 'src/contracts/repository-contracts/pokemon-repository.interface';
import { IPokemonService } from 'src/contracts/service-contracts/pokemon-service.interface';
import { ImportPokemonResponse } from 'src/controllers/pokemon/total-uploaded.response';
import { Pokemon } from 'src/models/pokemon.model';

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
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPokemonRepository } from 'src/contracts/repository-contracts/pokemon-repository.interface';
import { Pokemon } from 'src/models/pokemon.model';
import { DataSource, Repository } from 'typeorm';
import { BaseRepository } from './base/base.repository';

@Injectable()
export class PokemonRepository
  extends BaseRepository<Pokemon>
  implements IPokemonRepository
{
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,

    private dataSource: DataSource,
  ) {
    super(pokemonRepository);
  }
}

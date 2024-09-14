import { Pokemon } from 'src/models/pokemon.model';
import { IBaseRepository } from './base-repository.interface';

export interface IPokemonRepository extends IBaseRepository<Pokemon> {}

export const IPokemonRepository = Symbol('IPokemonRepository');

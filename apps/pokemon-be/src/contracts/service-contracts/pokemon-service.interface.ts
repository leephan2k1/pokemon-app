import { GetPokemonQueries } from 'src/controllers/pokemon/get-pokemon-list.request';
import { PokemonListResponse } from 'src/controllers/pokemon/get-pokemon-list.response';
import { NotFoundPokemonError } from 'src/controllers/pokemon/not-found-pokemon.error';
import { ImportPokemonResponse } from 'src/controllers/pokemon/total-uploaded.response';
import { Pokemon } from 'src/models/pokemon.model';
import { Either } from 'src/utils/either';

export interface IPokemonService {
  importPokemonList(file: Express.Multer.File): Promise<ImportPokemonResponse>;

  getPokemonDetails(
    id: number,
  ): Promise<Either<NotFoundPokemonError, never> | Either<never, Pokemon>>;

  getPokemonListOnDemand(
    queries: GetPokemonQueries,
  ): Promise<PokemonListResponse>;
}

export const IPokemonService = Symbol('IPokemonService');

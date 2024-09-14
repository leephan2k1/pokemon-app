import { ImportPokemonResponse } from 'src/controllers/pokemon/total-uploaded.response';

export interface IPokemonService {
  importPokemonList(file: Express.Multer.File): Promise<ImportPokemonResponse>;
}

export const IPokemonService = Symbol('IPokemonService');

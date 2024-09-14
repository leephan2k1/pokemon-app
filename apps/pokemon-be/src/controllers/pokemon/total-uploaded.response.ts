import { Pokemon } from 'src/models/pokemon.model';

export class ImportPokemonResponse {
  constructor(total: number) {
    this.totalUploaded = total;
  }

  totalUploaded: number;
}

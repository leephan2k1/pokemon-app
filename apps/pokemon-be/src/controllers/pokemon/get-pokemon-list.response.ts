import { PageInfo } from 'src/common/dtos/pagination-result.dto';
import { Pokemon } from 'src/models/pokemon.model';

export class PokemonListResponse {
  pageInfo: PageInfo;
  data: Pokemon[];

  constructor(data: Pokemon[], pageInfo: PageInfo) {
    this.pageInfo = pageInfo;
    this.data = data;
  }
}

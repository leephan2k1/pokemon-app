import { BaseQuery } from 'src/common/dtos/base-query.dto';

export class GetPokemonQueries extends BaseQuery {
  name?: string;
  type?: string;
  isLegendary?: boolean;
  minSpeed?: number;
  maxSpeed?: number;
}

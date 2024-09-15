export class PokemonQueries {
  name?: string;
  type?: string;
  isLegendary?: boolean;
  minSpeed?: number;
  maxSpeed?: number;
  limit: number = 20;
  page: number = 1;
}

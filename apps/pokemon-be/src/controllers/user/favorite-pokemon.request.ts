import { IsBoolean, IsNotEmpty } from 'class-validator';

export class FavoritePokemonRequest {
  @IsBoolean()
  isMark: boolean;

  @IsNotEmpty()
  pokemonId: number;
}

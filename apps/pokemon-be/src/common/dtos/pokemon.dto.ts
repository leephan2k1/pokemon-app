import { AutoMap } from '@automapper/classes';

export class PokemonDto {
  @AutoMap()
  id: number;

  @AutoMap()
  name: string;

  @AutoMap()
  type1: string;

  @AutoMap()
  type2: string;

  @AutoMap()
  image: string;

  @AutoMap()
  ytbUrl: string;

  @AutoMap()
  total: number;

  @AutoMap()
  hp: number;

  @AutoMap()
  attack: number;

  @AutoMap()
  defense: number;

  @AutoMap()
  spAttack: number;

  @AutoMap()
  spDefense: number;

  @AutoMap()
  speed: number;

  @AutoMap()
  generation: number;

  @AutoMap()
  isLegendary: boolean;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;
}

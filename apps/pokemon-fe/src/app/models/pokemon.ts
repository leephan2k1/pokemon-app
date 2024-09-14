export interface Pokemon {
  id: number;

  name: string;

  type1: string;

  type2: string;

  image: string;

  ytbUrl: string;

  total: number;

  hp: number;

  attack: number;

  defense: number;

  spAttack: number;

  spDefense: number;

  speed: number;

  generation: number;

  isLegendary: boolean;

  createdAt: Date;

  updatedAt: Date;
}

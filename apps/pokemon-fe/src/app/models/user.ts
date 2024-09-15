import { Pokemon } from './pokemon';

export interface User {
  id: string;

  userName: string;

  email?: string;

  displayName?: string;

  createdAt: Date;

  updatedAt: Date;

  favoritePokemons: Pokemon[];
}

import { FavoritePokemonRequest } from 'src/controllers/user/favorite-pokemon.request';
import { FavoritePokemonResponse } from 'src/controllers/user/favorite-pokemon.response';
import { User } from 'src/models/user.model';
import { Either } from 'src/utils/either';

export interface IUserService {
  getUserByConditions(user: Partial<User>): Promise<User | null>;

  existsByCredentials(user: Pick<User, 'email' | 'userName'>): Promise<boolean>;

  createUser(user: Partial<User>): Promise<Omit<User, 'password'>>;

  toggleFavoritePokemon(
    reqBody: FavoritePokemonRequest,
    currentUser: User,
  ): Promise<
    | Either<FavoritePokemonResponse, never>
    | Either<never, FavoritePokemonResponse>
  >;
}

export const IUserService = Symbol('IUserService');

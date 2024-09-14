import { Inject, Injectable } from '@nestjs/common';
import { IPokemonRepository } from 'src/contracts/repository-contracts/pokemon-repository.interface';
import { IUserRepository } from 'src/contracts/repository-contracts/user-repository.interface';
import { IUserService } from 'src/contracts/service-contracts/user-service.interface';
import { FavoritePokemonRequest } from 'src/controllers/user/favorite-pokemon.request';
import { FavoritePokemonResponse } from 'src/controllers/user/favorite-pokemon.response';
import { User } from 'src/models/user.model';
import { either } from 'src/utils/either';
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(IUserRepository)
    private readonly usersRepository: IUserRepository,

    @Inject(IPokemonRepository)
    private readonly pokemonRepository: IPokemonRepository,
  ) {}

  public async getUserByConditions(user: Partial<User>) {
    const { password, ...userWithoutPassword } = user;
    const result = await this.usersRepository.findByCondition({
      where: userWithoutPassword as FindOptionsWhere<User>,
    });

    return result;
  }

  public async existsByCredentials(
    user: Pick<User, 'email' | 'userName'>,
  ): Promise<boolean> {
    const result = await this.usersRepository.findByCondition({
      where: [{ email: user.email }, { userName: user.userName }],
    });
    return !!result;
  }

  public async createUser(
    user: Partial<User>,
  ): Promise<Omit<User, 'password'>> {
    const newUser = this.usersRepository.create(user);
    await this.usersRepository.save(newUser);
    const { password, ...newUserWithoutPassword } = newUser;

    return newUserWithoutPassword as Omit<User, 'password'>;
  }

  public async toggleFavoritePokemon(
    reqBody: FavoritePokemonRequest,
    currentUser: User,
  ) {
    const { isMark, pokemonId } = reqBody;
    const users = await this.usersRepository.findWithRelations({
      where: { id: currentUser.id },
      relations: {
        favoritePokemons: true,
      },
    });
    const user = users[0];

    if (isMark) {
      const existingPokemon =
        await this.pokemonRepository.findOneById(+pokemonId);

      if (
        existingPokemon &&
        !user.favoritePokemons.some((fp) => fp.id === pokemonId)
      ) {
        user.favoritePokemons.push(existingPokemon);
      } else {
        return either.error(new FavoritePokemonResponse({ status: 'failed' }));
      }
    } else {
      user.favoritePokemons = user.favoritePokemons.filter(
        (fp) => fp.id !== pokemonId,
      );
    }

    await this.usersRepository.save(user);

    return either.of(new FavoritePokemonResponse({ status: 'success' }));
  }

  public async getFavoritePokemonList(currentUser: User) {
    const users = await this.usersRepository.findWithRelations({
      where: { id: currentUser.id },
      relations: {
        favoritePokemons: true,
      },
    });
    const user = users[0];

    return user.favoritePokemons;
  }
}

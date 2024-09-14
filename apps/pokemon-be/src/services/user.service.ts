import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/contracts/repository-contracts/user-repository.interface';
import { IUserService } from 'src/contracts/service-contracts/user-service.interface';
import { User } from 'src/models/user.model';
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(IUserRepository)
    private readonly usersRepository: IUserRepository,
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
}

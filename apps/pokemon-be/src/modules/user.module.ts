import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from '../common/mapper-profiles/user-profile';
import { IUserRepository } from 'src/contracts/repository-contracts/user-repository.interface';
import { IUserService } from 'src/contracts/service-contracts/user-service.interface';
import { User } from 'src/models/user.model';
import { UserRepository } from 'src/repositories/user.repository';
import { UserService } from 'src/services/user.service';
import { UserController } from 'src/controllers/user/user.controller';
import { PokemonModule } from './pokemon.module';

const userServiceProvider: Provider = {
  provide: IUserService,
  useClass: UserService,
};
const userRepositoryProvider: Provider = {
  provide: IUserRepository,
  useClass: UserRepository,
};
@Module({
  imports: [TypeOrmModule.forFeature([User]), PokemonModule],

  controllers: [UserController],

  providers: [userServiceProvider, userRepositoryProvider, UserProfile],

  exports: [userServiceProvider, userRepositoryProvider],
})
export class UserModule {}

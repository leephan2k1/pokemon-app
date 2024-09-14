import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IUserRepository } from 'src/contracts/repository-contracts/user-repository.interface';
import { IUserService } from 'src/contracts/service-contracts/user-service.interface';
import { User } from 'src/models/user.model';
import { UserRepository } from 'src/repositories/user.repository';
import { UserService } from 'src/services/user.service';

const userServiceProvider: Provider = {
  provide: IUserService,
  useClass: UserService,
};
const userRepositoryProvider: Provider = {
  provide: IUserRepository,
  useClass: UserRepository,
};
@Module({
  imports: [TypeOrmModule.forFeature([User])],

  providers: [userServiceProvider, userRepositoryProvider],

  exports: [userServiceProvider, userRepositoryProvider],
})
export class UserModule {}

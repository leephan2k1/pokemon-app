import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BaseRepository } from './base/base.repository';
import { User } from 'src/models/user.model';
import { IUserRepository } from 'src/contracts/repository-contracts/user-repository.interface';

@Injectable()
export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository
{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private dataSource: DataSource,
  ) {
    super(userRepository);
  }
}

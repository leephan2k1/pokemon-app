import { User } from 'src/models/user.model';
import { IBaseRepository } from './base-repository.interface';

export interface IUserRepository extends IBaseRepository<User> {}

export const IUserRepository = Symbol('IUserRepository');

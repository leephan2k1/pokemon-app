import { AutoMap } from '@automapper/classes';
import { IsEmail } from 'class-validator';
import { BaseDto } from './base-dto';

export class UserDto extends BaseDto {
  @AutoMap()
  userName: string;

  @AutoMap()
  @IsEmail()
  email?: string;

  @AutoMap()
  displayName?: string;
}

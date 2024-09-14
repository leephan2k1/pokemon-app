import { MinLength } from 'class-validator';

export class RegisterUserRequest {
  @MinLength(3)
  userName: string;

  @MinLength(6)
  password: string;
}

import { UserDto } from 'src/common/dtos/user.dto';

export class AuthUserResponse {
  user: UserDto;

  access_token: string;

  refresh_token: string;

  constructor(partial?: Partial<AuthUserResponse>) {
    Object.assign(this, partial);
  }
}

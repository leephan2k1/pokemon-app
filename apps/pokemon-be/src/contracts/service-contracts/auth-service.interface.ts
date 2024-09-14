import { AuthUserResponse } from 'src/controllers/auth/auth-user-response.dto';
import { CredentialsTakenError } from 'src/controllers/auth/credentials-taken-error.dto';
import { InvalidCredentialsError } from 'src/controllers/auth/invalid-credentials-error.dto';
import { RegisterUserRequest } from 'src/controllers/auth/register-user.request';
import { SignOutUserRequest } from 'src/controllers/auth/signout-user-input.reqeust';
import { User } from 'src/models/user.model';
import { Either } from 'src/utils/either';
import { DeleteResult } from 'typeorm';

export interface IAuthService {
  registerUser(
    user: RegisterUserRequest,
  ): Promise<Either<CredentialsTakenError, User>>;

  signTokens(user: User): Promise<AuthUserResponse>;

  validateCredentials(
    email: string,
    password: string,
  ): Promise<Either<InvalidCredentialsError, User>>;

  signOutUser(signOutUserInput: SignOutUserRequest): Promise<DeleteResult>;
}

export const IAuthService = Symbol('IAuthService');

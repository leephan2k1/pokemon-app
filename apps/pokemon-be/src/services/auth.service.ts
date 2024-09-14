import { Inject, Injectable } from '@nestjs/common';
import { IAuthService } from '../contracts/service-contracts/auth-service.interface';
import { IUserService } from 'src/contracts/service-contracts/user-service.interface';
import { ITokenRepository } from 'src/contracts/repository-contracts/token-repository.interface';
import { JwtConfig } from 'src/configs';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserRequest } from 'src/controllers/auth/register-user.request';
import { either, Either } from 'src/utils/either';
import { CredentialsTakenError } from 'src/controllers/auth/credentials-taken-error.dto';
import { User } from 'src/models/user.model';
import { AuthUserResponse } from 'src/controllers/auth/auth-user-response.dto';
import { InvalidCredentialsError } from 'src/controllers/auth/invalid-credentials-error.dto';
import { SignOutUserRequest } from 'src/controllers/auth/signout-user-input.reqeust';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(IUserService)
    private readonly userService: IUserService,

    @Inject(ITokenRepository)
    private readonly tokenRepository: ITokenRepository,

    @Inject(JwtConfig.KEY)
    private readonly jwtConf: ConfigType<typeof JwtConfig>,

    private readonly jwtService: JwtService,
  ) {}

  public async signOutUser(signOutUserInput: SignOutUserRequest) {
    const { refresh_token } = signOutUserInput;

    return await this.tokenRepository.delete({ token: refresh_token });
  }

  public async validateCredentials(
    userName: string,
    password: string,
  ): Promise<Either<InvalidCredentialsError, User>> {
    const user = await this.userService.getUserByConditions({ userName });

    if (!user || !(await user?.comparePassword(password))) {
      return either.error(
        new InvalidCredentialsError({
          providedUsername: userName,
        }),
      );
    }

    return either.of(user);
  }

  public async signTokens(user: User): Promise<AuthUserResponse> {
    const payload = { username: user.userName, sub: user.id };
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConf.refreshSecret,
      expiresIn: this.jwtConf.refreshExpiresIn,
    });

    await this.tokenRepository.save({ user, token: refreshToken });

    return new AuthUserResponse({
      user,
      access_token: this.jwtService.sign(payload),
      refresh_token: refreshToken,
    });
  }

  public async registerUser(
    user: RegisterUserRequest,
  ): Promise<Either<CredentialsTakenError, User>> {
    if (await this.userService.existsByCredentials(user)) {
      return either.error(
        new CredentialsTakenError({
          providedUsername: user.userName,
        }),
      );
    }

    const newUser = await this.userService.createUser(user);
    return either.of(newUser as User);
  }
}

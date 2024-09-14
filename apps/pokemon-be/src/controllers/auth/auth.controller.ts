import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { IAuthService } from 'src/contracts/service-contracts/auth-service.interface';
import { RegisterUserRequest } from './register-user.request';
import { User } from 'src/models/user.model';
import { UserDto } from 'src/common/dtos/user.dto';
import { ValidateInput } from 'src/common/decorators/validate-input.decorator';
import { Response } from 'express';
import { LoginUserRequest } from './login-user.dto';
import {
  JwtAuthGuard,
  RefreshJwtAuthGuard,
} from 'src/common/guards/jwt-auth.guard';
import { SignOutUserRequest } from './signout-user-input.reqeust';
import { CurrentUser } from 'src/common/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(IAuthService)
    private readonly authService: IAuthService,

    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  @ValidateInput()
  @Post('sign-up')
  public async register(
    @Body() reqBody: RegisterUserRequest,
    @Res() res: Response,
  ) {
    const result = await this.authService.registerUser(reqBody);

    if (result.isError()) {
      return res.status(HttpStatus.BAD_REQUEST).send(result.value);
    }

    const authUser = await this.authService.signTokens(result.value);

    authUser.user = this.mapper.map(authUser.user, User, UserDto);
    return res.status(HttpStatus.CREATED).send(authUser);
  }

  @ValidateInput()
  @Post('sign-in')
  public async signInInternal(
    @Body() reqBody: LoginUserRequest,
    @Res() res: Response,
  ) {
    const result = await this.authService.validateCredentials(
      reqBody.userName,
      reqBody.password,
    );

    if (result.isError()) {
      return res.status(HttpStatus.UNAUTHORIZED).send(result.value);
    }

    const authUser = await this.authService.signTokens(result.value);
    authUser.user = this.mapper.map(authUser.user, User, UserDto);
    return res.status(HttpStatus.OK).send(authUser);
  }

  @UseGuards(JwtAuthGuard)
  @Post('sign-out')
  public async signOut(
    @Body() reqBody: SignOutUserRequest,
    @Res() res: Response,
  ) {
    const { refresh_token } = reqBody;
    const result = await this.authService.signOutUser({ refresh_token });

    if (result?.affected && result?.affected > 0) {
      return res.status(HttpStatus.OK).send(true);
    }

    return res.status(HttpStatus.NOT_FOUND).send(null);
  }

  @UseGuards(JwtAuthGuard)
  @Get('status')
  async userStatus(@CurrentUser() currentUser: User, @Res() res: Response) {
    const currentUserWithoutPassword = this.mapper.map(
      currentUser,
      User,
      UserDto,
    );

    return res.status(HttpStatus.OK).send(currentUserWithoutPassword);
  }

  @Get('refresh-token')
  @UseGuards(RefreshJwtAuthGuard)
  public async signNewTokens(
    @CurrentUser() currentUser: User,
    @Res() res: Response,
  ) {
    const authUser = await this.authService.signTokens(currentUser);
    authUser.user = this.mapper.map(authUser.user, User, UserDto);
    return res.status(HttpStatus.OK).send(authUser);
  }
}

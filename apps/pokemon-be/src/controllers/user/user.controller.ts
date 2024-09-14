import { InjectMapper } from '@automapper/nestjs';
import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { IUserService } from 'src/contracts/service-contracts/user-service.interface';
import { Mapper } from '@automapper/core';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { User } from 'src/models/user.model';
import { FavoritePokemonRequest } from './favorite-pokemon.request';
import { Response } from 'express';
import { ValidateInput } from 'src/common/decorators/validate-input.decorator';

@Controller('users')
export class UserController {
  constructor(
    @Inject(IUserService)
    private readonly userService: IUserService,

    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  @ValidateInput()
  @Post('favorite')
  @UseGuards(JwtAuthGuard)
  public async ToggleFavoritePokemon(
    @Res() res: Response,
    @Body() reqBody: FavoritePokemonRequest,
    @CurrentUser() currentUser: User,
  ) {
    const updatedFavoriteUser = await this.userService.toggleFavoritePokemon(
      reqBody,
      currentUser,
    );

    if (updatedFavoriteUser.isError()) {
      return res.status(HttpStatus.BAD_REQUEST).send(updatedFavoriteUser.value);
    }

    return res.status(HttpStatus.OK).send(updatedFavoriteUser.value);
  }
}

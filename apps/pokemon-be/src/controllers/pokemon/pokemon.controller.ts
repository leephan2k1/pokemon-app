import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  Controller,
  HttpStatus,
  Inject,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { IPokemonService } from 'src/contracts/service-contracts/pokemon-service.interface';

@Controller('pokemons')
export class PokemonController {
  constructor(
    @Inject(IPokemonService)
    private readonly pokemonService: IPokemonService,

    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  @Post('import')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      return new Error('No file uploaded');
    }

    const responseUpload = await this.pokemonService.importPokemonList(file);

    return res.status(HttpStatus.CREATED).send(responseUpload);
  }
}

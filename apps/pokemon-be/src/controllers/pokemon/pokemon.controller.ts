import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { PokemonDto } from 'src/common/dtos/pokemon.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { IPokemonService } from 'src/contracts/service-contracts/pokemon-service.interface';
import { Pokemon } from 'src/models/pokemon.model';
import { GetPokemonQueries } from './get-pokemon-list.request';

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

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  public async getPokemonDetails(
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    if (isNaN(+id)) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ error: 'id must be a number' });
    }

    const result = await this.pokemonService.getPokemonDetails(+id);

    if (result.isError()) {
      return res.status(HttpStatus.NOT_FOUND).send(result.value);
    }

    const pokemonDto = this.mapper.map(result.value, Pokemon, PokemonDto);
    return res.status(HttpStatus.OK).send(pokemonDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  public async getPokemonListOnDemand(
    @Res() res: Response,
    @Query() queries: GetPokemonQueries,
  ) {
    const pokemonListRes =
      await this.pokemonService.getPokemonListOnDemand(queries);

    pokemonListRes.data = this.mapper.mapArray(
      pokemonListRes.data,
      Pokemon,
      PokemonDto,
    );

    return res.status(HttpStatus.OK).send(pokemonListRes);
  }
}

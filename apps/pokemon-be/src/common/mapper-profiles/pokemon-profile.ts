import { createMap, MappingProfile, type Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { PokemonDto } from '../dtos/pokemon.dto';
import { Pokemon } from 'src/models/pokemon.model';

@Injectable()
export class PokemonProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(mapper, Pokemon, PokemonDto);
    };
  }
}

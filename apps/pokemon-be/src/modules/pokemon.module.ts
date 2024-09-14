import { Module, Provider } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonProfile } from 'src/common/mapper-profiles/pokemon-profile';
import { IPokemonRepository } from 'src/contracts/repository-contracts/pokemon-repository.interface';
import { IPokemonService } from 'src/contracts/service-contracts/pokemon-service.interface';
import { PokemonController } from 'src/controllers/pokemon/pokemon.controller';
import { Pokemon } from 'src/models/pokemon.model';
import { PokemonRepository } from 'src/repositories/pokemon.repository';
import { PokemonService } from 'src/services/pokemon.service';

const pokemonServiceProvider: Provider = {
  provide: IPokemonService,
  useClass: PokemonService,
};
const pokemonRepositoryProvider: Provider = {
  provide: IPokemonRepository,
  useClass: PokemonRepository,
};

@Module({
  imports: [
    TypeOrmModule.forFeature([Pokemon]),
    MulterModule.register({
      dest: './upload',
    }),
  ],

  providers: [
    pokemonServiceProvider,
    pokemonRepositoryProvider,
    PokemonProfile,
  ],

  controllers: [PokemonController],

  exports: [pokemonServiceProvider, pokemonRepositoryProvider],
})
export class PokemonModule {}

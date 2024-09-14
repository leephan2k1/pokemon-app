import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonProfile } from 'src/common/mapper-profiles/pokemon-profile';
import { IPokemonRepository } from 'src/contracts/repository-contracts/pokemon-repository.interface';
import { IPokemonService } from 'src/contracts/service-contracts/pokemon-service.interface';
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
  imports: [TypeOrmModule.forFeature([Pokemon])],

  providers: [
    pokemonServiceProvider,
    pokemonRepositoryProvider,
    PokemonProfile,
  ],

  exports: [pokemonServiceProvider, pokemonRepositoryProvider],
})
export class PokemonModule {}

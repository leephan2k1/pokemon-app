import { Injectable } from '@nestjs/common';
import { IPokemonService } from 'src/contracts/service-contracts/pokemon-service.interface';

@Injectable()
export class PokemonService implements IPokemonService {}

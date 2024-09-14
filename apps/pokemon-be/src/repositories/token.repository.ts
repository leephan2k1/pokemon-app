import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from './base/base.repository';
import { ITokenRepository } from 'src/contracts/repository-contracts/token-repository.interface';
import { Token } from 'src/models/token.model';

@Injectable()
export class TokenRepository
  extends BaseRepository<Token>
  implements ITokenRepository
{
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {
    super(tokenRepository);
  }
}

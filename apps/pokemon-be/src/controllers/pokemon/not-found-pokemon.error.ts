import { ErrorResponse } from 'src/common/dtos/error-response.dto';

export class NotFoundPokemonError extends ErrorResponse {
  id: number;

  constructor(partial?: Partial<NotFoundPokemonError>) {
    super('Pokemon not found');
    Object.assign(this, partial);
  }
}

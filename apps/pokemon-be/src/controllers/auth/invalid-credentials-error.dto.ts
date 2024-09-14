import { ErrorResponse } from 'src/common/dtos/error-response.dto';

export class InvalidCredentialsError extends ErrorResponse {
  userId?: string;

  providedUsername: string;

  constructor(partial?: Partial<InvalidCredentialsError>) {
    super('Invalid credentials provided.');
    Object.assign(this, partial);
  }
}

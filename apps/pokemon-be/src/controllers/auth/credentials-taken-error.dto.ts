import { ErrorResponse } from 'src/common/dtos/error-response.dto';

export class CredentialsTakenError extends ErrorResponse {
  providedEmail: string;

  providedUsername?: string;

  constructor(partial?: Partial<CredentialsTakenError>) {
    super('Credentials are already taken.');
    Object.assign(this, partial);
  }
}

import { ErrorResponse } from './error-response.dto';

export class InputError {
  field: string;

  messages: string[];
}

export class InvalidInputError extends ErrorResponse {
  errors: InputError[];

  constructor(errors: InputError[]) {
    super('Invalid input provided.');
    this.errors = errors;
  }
}

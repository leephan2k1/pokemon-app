import { InputError } from '../dtos/invalid-input.dto';

export class InputValidationException extends Error {
  errors: InputError[];

  constructor(errors: InputError[]) {
    super();
    this.errors = errors;
  }
}

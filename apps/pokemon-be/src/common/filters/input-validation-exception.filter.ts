import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { InvalidInputError } from '../dtos/invalid-input.dto';
import { InputValidationException } from '../exceptions/input-validation.exception';

@Catch(InputValidationException)
export class InputValidationExceptionFilter implements ExceptionFilter {
  catch(exception: InputValidationException, host: ArgumentsHost) {
    const { errors } = exception;
    const resp = new InvalidInputError(errors);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    return response.status(HttpStatus.BAD_REQUEST).send(resp);
  }
}

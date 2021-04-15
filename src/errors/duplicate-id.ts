import { CustomError } from 'Errors/custom-error';

export class DuplicateIdError extends CustomError {
  public statusCode = 409;

  constructor() {
    super('ID Already Exists');
  }
}

import { DatabaseError } from 'errors/database-error';

export function databaseErrorHandler(error: string): void {
  if (error) {
    throw new DatabaseError(error);
  }
}

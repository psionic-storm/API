import { DatabaseError } from 'errors/database-error';

export const databaseErrorHandler = (error: string): void => {
  if (error) {
    throw new DatabaseError(error);
  }
};

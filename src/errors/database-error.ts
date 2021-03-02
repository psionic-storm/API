import { CustomError } from "errors/custom-error";

export class DatabaseError extends CustomError {
	public statusCode = 600;

	constructor(errorMsg: string) {
		super(`[Database Error] : ${errorMsg}`);
	}
}

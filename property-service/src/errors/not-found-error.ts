import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode = 404;
  message: string;
  constructor(message = "Not Found!") {
    super(message);
    this.message = message;
    //Only because we are extending a built in class
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  serializeErrors() {
    return [{ message: this.message }];
  }
}

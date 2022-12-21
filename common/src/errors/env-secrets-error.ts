import { CustomError } from "./custom-error";

export class EnvVarError extends CustomError {
  statusCode: number;

  message: string;

  constructor(message: string) {
    super(message);
    this.statusCode = 500;
    this.message = message;
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [
      {
        message: this.message,
      },
    ];
  }
}

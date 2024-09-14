export abstract class ErrorResponse {
  errorMessage: string;

  protected constructor(message?: string) {
    if (message) {
      this.errorMessage = message;
    }
  }
}

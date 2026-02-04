export class CredentialInvalidException extends Error {
  statusCode: number;

  constructor(message = "As credencias estão erradas.") {
    super(message);
    this.statusCode = 401;
  }
}

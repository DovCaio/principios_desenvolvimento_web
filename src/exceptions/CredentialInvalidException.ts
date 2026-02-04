export class CredentialInvalidException extends Error {
  statusCode: number;

  constructor(message = "As credencias erradas.") {
    super(message);
    this.statusCode = 403;
  }
}

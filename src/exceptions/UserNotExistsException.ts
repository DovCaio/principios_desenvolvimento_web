export class UserNotExistsException extends Error {
  statusCode: number;

  constructor(message = "Usuário não existe.") {
    super(message);
    this.statusCode = 404;
  }
}

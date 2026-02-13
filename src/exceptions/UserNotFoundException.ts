export class UserNotFoundException extends Error {
  statusCode: number;

  constructor(message = "O usuário não foi encontrado.") {
    super(message);
    this.statusCode = 404;
  }
}

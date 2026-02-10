export class UserNotExistsException extends Error {
  statusCode: number;

  constructor(message = "Você não tem permissão para acessar este recurso.") {
    super(message);
    this.statusCode = 403;
  }
}

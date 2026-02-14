export class NotAllowedException extends Error {
  statusCode: number;

  constructor(message = "Acesso não permitido.") {
    super(message);
    this.statusCode = 403;
  }
}

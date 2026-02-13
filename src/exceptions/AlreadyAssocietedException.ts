export class AlreadyAssocietedException extends Error {
  statusCode: number;

  constructor(message = "O usuário já está associado a este lote.") {
    super(message);
    this.statusCode = 409;
  }
}

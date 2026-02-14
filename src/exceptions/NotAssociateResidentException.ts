export class NotAssociateResidentException extends Error {
  statusCode: number;

  constructor(message = "Esse usuário não está associado a esse lote.") {
    super(message);
    this.statusCode = 400;
  }
}

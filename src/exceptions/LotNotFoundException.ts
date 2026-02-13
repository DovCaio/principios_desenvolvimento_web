export class LotNotFoundException extends Error {
  statusCode: number;

  constructor(message = "O lote não foi encontrado.") {
    super(message);
    this.statusCode = 404;
  }
}

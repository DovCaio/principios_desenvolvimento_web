export class FieldsInvalidsException extends Error {
  statusCode: number;

  constructor(message = "Os tipos dos campos estão inválidos.") {
    super(message);
    this.statusCode = 400;
  }
}

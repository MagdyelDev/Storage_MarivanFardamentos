// Erro "de negócio", com status HTTP embutido. As services lançam esse
// erro em vez de `res.status(...)` — quem sabe transformar isso numa
// resposta HTTP é o errorHandler, não a camada de regras de negócio.
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
  }
}

module.exports = ApiError;

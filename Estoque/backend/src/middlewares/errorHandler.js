// Middleware de erro do Express (precisa dos 4 argumentos para ser
// reconhecido como tal). Fica de olho em qualquer `next(err)` chamado
// pelos controllers e transforma isso numa resposta JSON consistente.
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? "Erro interno do servidor." : err.message;

  if (statusCode === 500) {
    console.error(err);
  }

  res.status(statusCode).json({ erro: message });
}

module.exports = errorHandler;

const usuarioService = require("../services/usuario.service");

function listar(req, res, next) {
  try {
    res.json(usuarioService.listarUsuarios());
  } catch (err) {
    next(err);
  }
}

function buscarPorId(req, res, next) {
  try {
    res.json(usuarioService.buscarUsuarioPorId(req.params.id));
  } catch (err) {
    next(err);
  }
}

function remover(req, res, next) {
  try {
    usuarioService.removerUsuario(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { listar, buscarPorId, remover };

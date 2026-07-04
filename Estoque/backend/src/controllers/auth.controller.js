const authService = require("../services/auth.service");

function criarUsuario(req, res, next) {
  try {
    const usuario = authService.criarUsuario(req.body);
    res.status(201).json({ ok: true, usuario });
  } catch (err) {
    next(err);
  }
}

function login(req, res, next) {
  try {
    const usuario = authService.login(req.body.email, req.body.senha);
    res.json({ ok: true, usuario });
  } catch (err) {
    next(err);
  }
}

module.exports = { criarUsuario, login };

const usuarioRepository = require("../repositories/usuario.repository");
const ApiError = require("../utils/ApiError");

function listarUsuarios() {
  return usuarioRepository.findAll();
}

function buscarUsuarioPorId(id) {
  const usuario = usuarioRepository.findById(id);
  if (!usuario) {
    throw new ApiError(404, "Usuário não encontrado.");
  }
  return usuario;
}

function removerUsuario(id) {
  buscarUsuarioPorId(id);
  const removido = usuarioRepository.remove(id);
  if (!removido) {
    throw new ApiError(500, "Não foi possível remover o usuário.");
  }
  return true;
}

module.exports = { listarUsuarios, buscarUsuarioPorId, removerUsuario };

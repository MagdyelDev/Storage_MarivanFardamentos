const authRepository = require("../repositories/auth.repository");
const ApiError = require("../utils/ApiError");

function validarDadosUsuario({ nome, email, senha }) {
  if (!nome || typeof nome !== "string" || !nome.trim()) {
    throw new ApiError(400, "O campo 'nome' é obrigatório.");
  }

  if (!email || typeof email !== "string" || !email.trim()) {
    throw new ApiError(400, "O campo 'email' é obrigatório.");
  }

  if (!senha || typeof senha !== "string" || senha.length < 4) {
    throw new ApiError(400, "A senha deve ter ao menos 4 caracteres.");
  }
}

function criarUsuario(dados) {
  validarDadosUsuario(dados);
  return authRepository.createUser({
    nome: dados.nome.trim(),
    email: dados.email.trim().toLowerCase(),
    senha: dados.senha,
  });
}

function login(email, senha) {
  if (!email || !senha) {
    throw new ApiError(400, "E-mail e senha são obrigatórios.");
  }

  const usuario = authRepository.authenticateUser(email, senha);
  if (!usuario) {
    throw new ApiError(401, "Credenciais inválidas.");
  }

  return usuario;
}

module.exports = { criarUsuario, login };

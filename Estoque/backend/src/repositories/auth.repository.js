const db = require("../database/connection");
const { hashPassword, verifyPassword } = require("../utils/password");

function findByEmail(email) {
  return db.prepare("SELECT * FROM usuarios WHERE email = ?").get(email);
}

function createUser({ nome, email, senha }) {
  const existingUser = findByEmail(email);
  if (existingUser) {
    const error = new Error("Já existe um usuário com este e-mail.");
    error.statusCode = 409;
    throw error;
  }

  const { lastInsertRowid } = db
    .prepare(
      "INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)"
    )
    .run(nome.trim(), email.trim().toLowerCase(), hashPassword(senha));

  return findById(lastInsertRowid);
}

function findById(id) {
  return db.prepare("SELECT id, nome, email, criado_em FROM usuarios WHERE id = ?").get(id);
}

function authenticateUser(email, senha) {
  const user = findByEmail(email.trim().toLowerCase());
  if (!user) {
    return null;
  }

  if (!verifyPassword(senha, user.senha_hash)) {
    return null;
  }

  return {
    id: user.id,
    nome: user.nome,
    email: user.email,
    criado_em: user.criado_em,
  };
}

module.exports = { createUser, authenticateUser, findByEmail };

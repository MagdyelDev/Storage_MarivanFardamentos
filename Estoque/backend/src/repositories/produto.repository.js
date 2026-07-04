const db = require("../database/connection");

// Toda query fica isolada aqui. Sempre com parâmetros (?) — nunca
// concatenando strings — para evitar SQL Injection.

function findAll() {
  return db.prepare("SELECT * FROM produtos ORDER BY id DESC").all();
}

function findById(id) {
  return db.prepare("SELECT * FROM produtos WHERE id = ?").get(id);
}

function findByCodigo(codigo) {
  return db.prepare("SELECT * FROM produtos WHERE codigo = ?").get(codigo);
}

function create({ codigo, nome, quantidade, preco }) {
  const codigoFinal = codigo === undefined || codigo === null || `${codigo}`.trim() === '' ? null : `${codigo}`.trim();
  const { lastInsertRowid } = db
    .prepare(
      "INSERT INTO produtos (codigo, nome, quantidade, preco) VALUES (?, ?, ?, ?)"
    )
    .run(codigoFinal, nome, quantidade, preco);

  return findById(lastInsertRowid);
}

function update(id, { codigo, nome, quantidade, preco }) {
  db.prepare(
    "UPDATE produtos SET codigo = ?, nome = ?, quantidade = ?, preco = ? WHERE id = ?"
  ).run(codigo, nome, quantidade, preco, id);

  return findById(id);
}

function remove(id) {
  const { changes } = db.prepare("DELETE FROM produtos WHERE id = ?").run(id);
  return changes > 0;
}

module.exports = { findAll, findById, findByCodigo, create, update, remove };

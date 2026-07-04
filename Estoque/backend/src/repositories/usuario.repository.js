const db = require("../database/connection");

function findAll() {
  return db.prepare("SELECT id, nome, email, criado_em FROM usuarios ORDER BY id DESC").all();
}

function findById(id) {
  return db.prepare("SELECT id, nome, email, criado_em FROM usuarios WHERE id = ?").get(id);
}

function remove(id) {
  const { changes } = db.prepare("DELETE FROM usuarios WHERE id = ?").run(id);
  return changes > 0;
}

module.exports = { findAll, findById, remove };

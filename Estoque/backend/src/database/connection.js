const path = require("path");
const { DatabaseSync } = require("node:sqlite");
const { dbPath } = require("../config/env");

// Este arquivo tem uma única responsabilidade: abrir a conexão com o
// SQLite e garantir que o schema exista. Nenhuma query de negócio deve
// morar aqui — isso é papel das repositories.
const resolvedPath = path.resolve(process.cwd(), dbPath);

const db = new DatabaseSync(resolvedPath);

db.exec("PRAGMA foreign_keys = ON;");

db.exec(`
  CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo TEXT,
    nome TEXT NOT NULL,
    quantidade INTEGER NOT NULL DEFAULT 0,
    preco REAL NOT NULL DEFAULT 0,
    criado_em TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

const produtoColumns = db.prepare("PRAGMA table_info(produtos)").all();
const hasCodigoColumn = produtoColumns.some((column) => column.name === "codigo");

if (!hasCodigoColumn) {
  db.exec("ALTER TABLE produtos ADD COLUMN codigo TEXT;");
}

db.exec(`
  UPDATE produtos
  SET codigo = CASE
    WHEN TRIM(COALESCE(codigo, '')) = '' THEN 'ITEM-' || id
    ELSE codigo
  END
  WHERE codigo IS NULL OR TRIM(codigo) = '';
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha_hash TEXT NOT NULL,
    criado_em TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

module.exports = db;

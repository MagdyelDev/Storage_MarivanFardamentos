require("dotenv").config();

// Centraliza a leitura das variáveis de ambiente em um único lugar.
// Nenhum outro arquivo do projeto deve chamar `process.env` diretamente.
module.exports = {
  port: Number(process.env.PORT) || 3000,
  dbPath: process.env.DB_PATH || "./src/database/database.sqlite",
};

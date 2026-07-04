const express = require("express");
const routes = require("./src/routes");
const errorHandler = require("./src/middlewares/errorHandler");

const app = express();

const path = require("path");

// Middlewares globais
app.use(express.json());
app.use("/api", (req, res, next) => {
  console.log("[API]", req.method, req.path, req.body);
  next();
});

// Todas as rotas da API ficam debaixo de /api
app.use("/api", routes);

app.use(express.static(path.join(__dirname, "../frontend/public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public/pages/login.html"));
});

app.get("/mvadmin", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public/pages/admin.html"));
});

// Qualquer rota não mapeada cai aqui
app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada." });
});

// Sempre por último: captura os erros repassados via next(err)
app.use(errorHandler);

module.exports = app;

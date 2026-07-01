const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("<h1>Servidor funcionando!</h1><p>Acesse /teste para testar</p>");
});

app.get("/teste", (req, res) => {
    res.send("<h1>Rota /teste funcionando!</h1>");
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
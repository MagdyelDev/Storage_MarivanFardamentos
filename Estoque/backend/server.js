const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// SERVIR ARQUIVOS ESTÁTICOS DO FRONTEND
app.use(express.static(path.join(__dirname, "../frontend/public")));

//app.get("/", (req, res) => {
//    res.send("<h1>Servidor funcionando!</h1><p>Acesse /teste para testar</p>");
//});

// login agora abre o HTML real
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/public/pages/login.html"));
});

app.get("/teste", (req, res) => {
    res.send("<h1>Rota /teste funcionando!</h1>");
});



app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}/`);
});

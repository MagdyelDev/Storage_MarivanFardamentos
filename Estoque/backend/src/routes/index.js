const { Router } = require("express");
const produtoRoutes = require("./produto.routes");
const authRoutes = require("./auth.routes");
const usuarioRoutes = require("./usuario.routes");

const router = Router();

router.use("/auth", authRoutes);
router.use("/produtos", produtoRoutes);
router.use("/usuarios", usuarioRoutes);

module.exports = router;

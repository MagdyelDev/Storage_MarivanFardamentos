const { Router } = require("express");
const usuarioController = require("../controllers/usuario.controller");

const router = Router();

router.get("/", usuarioController.listar);
router.get("/:id", usuarioController.buscarPorId);
router.delete("/:id", usuarioController.remover);

module.exports = router;

const express = require("express")
const router = express.Router()

const controller = require("../controllers/livrosController")

router.get("/mostrarLivros", controller.teste)
router.post("/addLivro", controller.add)
router.post("/deleteLivro/:id", controller.delet)
router.get("/buscarLivro/:id", controller.buscar_id)
router.post("/atualizarLivro", controller.atualizar)

module.exports = router
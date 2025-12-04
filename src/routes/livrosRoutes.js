const express = require("express")
const router = express.Router()

const controller = require("../controllers/livrosController")

router.get("/mostrarLivros", controller.mostrar)
router.post("/addLivro", controller.add)
router.get("/deleteLivro/:id", controller.delet)
router.post("/buscarLivro", controller.buscar)
router.post("/atualizarLivro", controller.atualizar)

module.exports = router
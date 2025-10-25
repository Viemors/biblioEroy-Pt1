const express = require("express")
const router = express.Router()

const controller = require("../controllers/devolucaoController")

router.get("/mostrarDevol", controller.Todos)//aq tem que vincular a devolucao e emprestimo ao usuario, dai pega todos que estao vinculados a ele, do jeito que tá, ele pega todos do bd
router.post("/addDevol", controller.add) //rota para add a devoluçao
router.get("/deleteDevol/:id", controller.delet) //rota para deletar a devolucao, nao faz mto sentido eu acho
router.get("/buscarDevol/:id", controller.buscar_id) //tem que vincular tbm
router.post("/atualizarDevol", controller.atualizar)//rota para atualizar a devolucao

module.exports = router
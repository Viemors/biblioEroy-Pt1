const express = require("express")
const router = express.Router()

const controller = require("../controllers/emprestimoController")

router.get("/mostrarEmprestimo", controller.Todos)//aq tem que vincular o emprestimo ao usuario, dai pega todos que estao vinculados a ele, do jeito que tá, ele pega todos do bd
router.post("/addEmprestimo", controller.add) //rota para criar o emprestimo
router.post("/deleteEmprestimo", controller.delet) //NÃO tem contato com o user, feito internamente com a devolução
router.post("/devolucao", controller.devolucao)
router.get("/buscarEmprestimo/:id", controller.buscar_id)//aq tem que vincular o emprestimo ao usuario, dai pega todos que estao vinculados a ele, do jeito que tá, ele pega todos do bd
router.post("/atualizarEmprestimo", controller.atualizar)//rota para mudar o status do emprestimo

//Solicitações
router.post("/solicitar", controller.solicitar) //rota para solicitar o emprestimo


module.exports = router
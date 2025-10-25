const express = require("express")
const router = express.Router()

const controller = require("../controllers/cadastroController")

router.get("/mostrarCadastros", controller.Todos)//NÃO tem contato com o usuario
router.post("/addCadastro", controller.add) //rota para criar o cadastro
router.get("/deleteCadastro/:id", controller.delet) //rota para deletar a conta
router.get("/buscarCadastro/:id", controller.buscar_id) //NÃO tem contato com o usuario
router.post("/atualizarCadastro", controller.atualizar)//rota para mudar a senha

module.exports = router
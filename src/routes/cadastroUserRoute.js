const express = require("express")
const router = express.Router()

const controller = require("../controllers/cadastroController")

router.get("/mostrarCadastros", controller.TodosUser)//NÃO tem contato com o usuario
router.post("/addCadastro", controller.addUser) //rota para criar o cadastro
router.get("/deleteCadastro/:id", controller.deletUser) //rota para deletar a conta
router.get("/buscarCadastro/:id", controller.buscar_idUser) //NÃO tem contato com o usuario
router.post("/atualizarCadastro", controller.atualizarUser)//rota para mudar a senha

module.exports = router
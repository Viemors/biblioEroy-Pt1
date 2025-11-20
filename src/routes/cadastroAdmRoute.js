const express = require("express")
const router = express.Router()

const controller = require("../controllers/cadastroadmController")

//Só copia e cola das rotas do user

router.get("/mostrarCadastros", controller.Todos)//NÃO tem contato com o usuario
router.post("/addCadastro", controller.add) //rota para criar o cadastro
router.get("/deleteCadastro", controller.delet) //rota para deletar a conta
router.get("/buscarCadastro/:id", controller.buscar_id) //NÃO tem contato com o usuario
router.put("/atualizarCadastro", controller.atualizar)//rota para mudar a senha
router.post("/login", controller.login)//rota para login
router.get("/sair", controller.sair); // rota pra sair da conta (quebrar a session)

module.exports = router


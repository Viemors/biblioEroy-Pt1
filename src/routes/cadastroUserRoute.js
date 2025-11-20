const express = require("express")
const router = express.Router()

const controller = require("../controllers/cadastroUserController")

router.get("/mostrarCadastros", controller.TodosUser)//NÃO tem contato com o usuario
router.post("/addCadastro", controller.addUser) //rota para criar o cadastro
router.get("/deleteCadastro", controller.deletUser) //rota para deletar a conta
router.get("/buscarCadastro/:id", controller.buscar_idUser) //NÃO tem contato com o usuario
router.put("/atualizarCadastro", controller.atualizarUser)//rota para mudar a senha
router.post("/login", controller.login)//rota para login
router.get("/sair", controller.sair); // rota pra sair da conta (quebrar a session)

module.exports = router;

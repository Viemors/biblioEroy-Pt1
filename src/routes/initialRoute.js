const express = require('express');
const router = express.Router();

const initialController = require('../controllers/initialController');
const cadastroUserController = require('../controllers/cadastroUserController'); //coloquei aq pq nao tava funcionando a rota de perfilLeitor, dai criei uma funcao só pra isso
const emprestimoController = require("../controllers/emprestimoController")

router.get('/', initialController.paginaInicial);
router.get('/login', initialController.login);
router.get('/cadastro', initialController.cadastro);
router.get('/perfil/livro', cadastroUserController.mostrarPerfilLivro); //Mesma fita dos outros
router.get('/perfil/leitor', cadastroUserController.mostrarPerfilLeitor); //aq a função
router.get('/perfil/biblio', cadastroUserController.mostrarPerfilBiblio); //aq a função
router.get('/emprestimo', emprestimoController.mostrarEmprestimo); //Mesma fita dos outros

//As funções do emprestimo e do livro estão no cadastro user porque não queria colocar outro model aqui :( mas tem que mudar depois


module.exports = router;
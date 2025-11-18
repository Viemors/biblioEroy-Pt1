const express = require('express');
const router = express.Router();

const initialController = require('../controllers/initialController');
const cadastroUserController = require('../controllers/cadastroUserController'); //coloquei aq pq nao tava funcionando a rota de perfilLeitor, dai criei uma funcao só pra isso
const cadastroBiblioController = require('../controllers/cadastroadmController'); //coloquei aq pq nao tava funcionando a rota de perfilBiblio, dai criei uma funcao só pra isso

router.get('/', initialController.paginaInicial);
router.get('/login', initialController.login);
router.get('/cadastro', initialController.cadastro);
router.get('/perfil/livro', initialController.perfil_livro);
router.get('/perfil/leitor', cadastroUserController.mostrarPerfilLeitor); //aq a função
router.get('/perfil/bibliotecario', cadastroBiblioController.mostrarPerfilBiblio); //aq a função
router.get('/emprestimo', initialController.emprestimo);


module.exports = router;
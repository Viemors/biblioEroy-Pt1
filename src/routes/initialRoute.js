const express = require('express');
const router = express.Router();

const initialController = require('../controllers/initialController');

router.get('/', initialController.paginaInicial);
router.get('/login', initialController.login);
router.get('/cadastro', initialController.cadastro);
router.get('/perfil/livro', initialController.perfil_livro);
router.get('/perfil/leitor', initialController.perfil_leitor);
router.get('/perfil/bibliotecario', initialController.perfil_biblio);

module.exports = router;
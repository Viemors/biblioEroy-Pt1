const express = require('express');
const app = express();
const session = require('express-session'); //extensão nova que eu baixei rs
const flash = require('connect-flash'); //extensão nova que eu baixei rsrs
const methodOverride = require('method-override');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const path = require('path');
app.use(express.static(path.join(__dirname, 'view')));

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({ //peguei de um site, aparentemente é padrão
    secret: 'segredo-super-seguro',  // Chave usada para assinar o cookie da sessão
    resave: false,                   // Evita salvar a sessão se nada mudou
    saveUninitialized: true,         // Salva sessões que ainda não foram inicializadas
    cookie: { maxAge: 3600000 }      // Tempo de expiração do cookie (1 hora)
}));

app.use(flash()); //extensão nova que eu baixei rs

// disponibiliza as mensagens flash nas views via res.locals
app.use((req, res, next) => {
    // tipos comuns: 'success' e 'error' — os controladores usam esses tipos
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

const initialRoute = require('./routes/initialRoute');
app.use('/', initialRoute); 

const cadastroUser = require('./routes/cadastroUserRoute');
app.use('/', cadastroUser); 

const livros = require('./routes/livrosRoutes');
app.use('/', livros);

//Rota do emprestimo
const emprestimo = require('./routes/emprestimoRoutes');
app.use('/', emprestimo); 

const bd = require('./routes/bdRoutes');
app.use('/', bd); 

module.exports = app;
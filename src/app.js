const express = require('express');
const app = express();
const methodOverride = require('method-override');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const path = require('path');
app.use(express.static(path.join(__dirname, 'view')));

//Permitir o acesso as pastas de estilização
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const initialRoute = require('./routes/initialRoute');
app.use('/', initialRoute); 

const cadastro = require('./routes/cadastroUserRoute');
app.use('/', cadastro); 

const bd = require('./routes/bdRoutes');
app.use('/', bd); 

module.exports = app;
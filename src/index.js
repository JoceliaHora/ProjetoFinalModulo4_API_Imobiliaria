// Importando:
const express = require('express');
// Instanciando:
const app = express();
// Importando:
const cliente = require('./controllers/cliente-controller');
const admController = require('./controllers/admController');
const aluguelController = require('./controllers/aluguel-controller');
//PROXIMO


const bd = require('./infra/sqlite-db');

// Body-parser:
app.use(express.json());

// Chamando o controller e passando o express:
cliente(app, bd);
admController(app, bd);
aluguelController(app);
//PROXIMO

// Porta:
app.listen(4000, ()=>{
    console.log("Rodando na porta 4000");
});


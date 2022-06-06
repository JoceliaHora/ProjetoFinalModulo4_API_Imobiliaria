console.log("Iniciando processo de deploy!")

// Importando:
const express = require('express');
// Instanciando:
const app = express();
// Importando:
const cliente = require('./src/controllers/cliente-controller');
const admController = require('./src/controllers/admController');
const aluguelController = require('./src/controllers/aluguel-controller');
const corretoresController = require('./src/controllers/corretores-controller');
const vendas = require('./src/controllers/vendasController');
//PROXIMO


const bd = require('./src/infra/sqlite-db');

// Body-parser:
app.use(express.json());

// Chamando o controller e passando o express:
cliente(app, bd);
admController(app, bd);
aluguelController(app);
corretoresController(app);
vendas(app,bd);
//PROXIMO
console.log("Finalizando processo de deploy!")
// Porta:
var porta = process.env.PORT || 8080;
app.listen(porta, ()=>{
    console.log("Rodando na porta " + porta);
});


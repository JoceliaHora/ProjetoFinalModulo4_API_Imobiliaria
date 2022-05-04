// Importando:
const express = require('express');
// Instanciando:
const app = express();
// Importando:
const cliente = require('./controllers/cliente-controller');
const bd = require('./infra/sqlite-db');

// Body-parser:
app.use(express.json());

// Chamando o controller e passando o express:
cliente(app, bd);


// Porta:
app.listen(4000, ()=>{
    console.log("Rodando na porta 4000");
});
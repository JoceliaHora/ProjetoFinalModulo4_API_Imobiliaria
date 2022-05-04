// Importa o sqlite3:
const sqlite3 = require('sqlite3').verbose();
// Importa o Banco de Dados:
const db = new sqlite3.Database('./src/infra/database.db');

//==== CLIENTES:
const CLIENTES_SCHEMA = `
CREATE TABLE IF NOT EXISTS "CLIENTES" (
    "ID" INTEGER PRIMARY KEY AUTOINCREMENT,
    "NOME" varchar(100),
    "CPF" integer,
    "TELEFONE" integer,
    "ENDERECO" varchar(100),
    "TIPO_DE_IMOVEL" varchar(100),
    "CONDICAO_DO_IMOVEL" varchar(100),
    "EMAIL" varchar(64),
    "SENHA" varchar(64)
  );`;

const ADD_CLIENTES_DATA = `
INSERT INTO CLIENTES (ID, NOME, CPF, TELEFONE, ENDERECO, TIPO_DE_IMOVEL, CONDICAO_DO_IMOVEL, EMAIL, SENHA)
VALUES 
    (1, 'Eugênio Oliveira', '00000000000', '00000000000', 'Rua Eugenio Oliveira, n 1, casa 1, Oliveira, Eugenio, EUA', 'casa com quintal e vaga na garagem', 'aluguel', 'eugenio.oliveira@bol.com.br', '*******'),
    (2, 'Olívia Ribeiro', '11100011100', '110001110001', 'Rua Ribeiro, n 2, apto 222, Oliveira, OL, ROL', 'apartamento mobiliado e sem vaga na garagem, com condominio', 'venda', 'olivia.ribeiro@gmail.com', '********'),
    (3, 'Mirtes Faria Lima', '22200022200', '22000222002', 'Rua Faria Mirtes, n 3, casa 3, Mirtes Faria, MI, BRA', 'casa de condominio geminada com quintal independente', 'compra', 'mirtes_fl@yahoo.com', '********')
`

function criaTabelaClientes() {
    db.run(CLIENTES_SCHEMA, (error)=> {
       if (error) console.log("Erro ao criar tabela de CLIENTES");
    });
}


function populaTabelaClientes() {
    db.run(ADD_CLIENTES_DATA, (error)=> {
       if (error) console.log("Erro ao popular tabela de CLIENTES");
    });
}

// a sequencia que devem ser executadas as tabelas
db.serialize( ()=> {
    criaTabelaClientes();
    populaTabelaClientes();
});
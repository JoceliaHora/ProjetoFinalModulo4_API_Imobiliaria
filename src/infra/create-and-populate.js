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
    db.run(CLIENTES_SCHEMA, (error) => {
        if (error) console.log("Erro ao criar tabela de CLIENTES");
    });
}


function populaTabelaClientes() {
    db.run(ADD_CLIENTES_DATA, (error) => {
        if (error) console.log("Erro ao popular tabela de CLIENTES");
    });
}


//CREATE POPULATE ADM

// TIPOPLANO: TIPO DO SERVIÇO [BASICO, NORMAL, VIP, PREMIUM]
// TEMPOCONTRATO: TEMPO DO CONTRATO EM MESES [ 1, 2 ... ]
// TAXADOSERVICO: VALOR COBRADO PLEO SERVIÇO DE ADMINISTRAÇÃO/MES [100]
// SEGUROINCLUSO: SE O SERVIÇO ADMISTRATIVO INCLUI SEGURO [1, 0] 
const ADM_SCHEMA = `
CREATE TABLE IF NOT EXISTS "ADM" (
    "ID" INTEGER PRIMARY KEY AUTOINCREMENT,
    "TIPOPLANO" varchar(64),
    "TEMPOCONTRATO" INTEGER,
    "TAXASERVICO" INTEGER,
    "SEGUROINCLUSO" INTEGER 
  );`;

const ADD_ADM_DATA = `
INSERT INTO ADM (TIPOPLANO, TEMPOCONTRATO, TAXASERVICO, SEGUROINCLUSO)
VALUES 
    ( "BASICO", 12, 200, 0),
    ( "BASICO", 24, 160, 0),
    ( "PREMIUM", 6, 500, 1)
`

function criaTabelaAdm() {
    console.log("Criando tabelas ... ");
    db.run(ADM_SCHEMA, (error) => {
        if (error) console.log("Erro ao criar tabela de serviços administrativos");
    });
    console.log("Tabelas criadas.");
}


function populaTabelaAdm() {
    console.log("Populando tabelas ... ");
    db.run(ADD_ADM_DATA, (error) => {
        if (error) console.log("Erro ao popular tabela de serviços administrativos");
    });
    console.log("Tabelas populadas.");
}

//FINAL DO CREATE POPULATE ADM
//INICIO CREATE POPULATE ALUGUEL
//==== Aluguel
const ALUGUEL_SCHEMA = `
CREATE TABLE IF NOT EXISTS "ALUGUEL" (
    "ID" INTEGER PRIMARY KEY AUTOINCREMENT,
    "ENDERECO" varchar(64),
    "VALOR" real,
    "CORRETORID" integer,
    "ALUGUELTIPO" varchar(64),
    "PROPRIETARIOID" integer,
    "INQUILINOID" integer,
    "IMG1"  VARCHAR(512),
    "IMG2" VARCHAR(512)
  );`;

const ADD_ALUGUEL_DATA = `
INSERT INTO ALUGUEL (ID, ENDERECO, VALOR, CORRETORID, ALUGUELTIPO, PROPRIETARIOID, INQUILINOID, IMG1, IMG2 )
VALUES
    (1, 'AMOROSO COSTA,349',2300, 048, 'APARTAMENTO', 450, 571, 'https://raw.githubusercontent.com/lccalebe/projetofinal-mod5-imobiliaria-resilia/master/imobiliaria_m5/src/assets/Aluguel/amoroso%20costa%20(aluguel)/amorosoFachada.jpg', 'https://raw.githubusercontent.com/lccalebe/projetofinal-mod5-imobiliaria-resilia/master/imobiliaria_m5/src/assets/Aluguel/amoroso%20costa%20(aluguel)/AmorosoQuarto.jpg'),
    (2, 'MANUEL BASTOS,289',700, 049, 'MANSÃO', 200, 572, 'https://raw.githubusercontent.com/lccalebe/projetofinal-mod5-imobiliaria-resilia/master/imobiliaria_m5/src/assets/Aluguel/Manuel%20Bastos%20de%20Oliveira%20aluguel/ManoelFachada.jpg', 'https://raw.githubusercontent.com/lccalebe/projetofinal-mod5-imobiliaria-resilia/master/imobiliaria_m5/src/assets/Aluguel/Manuel%20Bastos%20de%20Oliveira%20aluguel/ManuelCorporation.jpg'),
    (3, 'BARATA RIBEIRO,408',3200, 021, 'APARTAMENTO', 500, 300, 'https://raw.githubusercontent.com/lccalebe/projetofinal-mod5-imobiliaria-resilia/master/imobiliaria_m5/src/assets/Aluguel/Barata%20Ribeiro(Aluguel)/BarataRiFachada.jpg', 'https://raw.githubusercontent.com/lccalebe/projetofinal-mod5-imobiliaria-resilia/master/imobiliaria_m5/src/assets/Aluguel/Barata%20Ribeiro(Aluguel)/BarataRiSala.jpg'),
    (4, 'GENERAL OSORIO,1500',4000, 020, 'APARTAMENTO', 455, 550, 'https://raw.githubusercontent.com/lccalebe/projetofinal-mod5-imobiliaria-resilia/master/imobiliaria_m5/src/assets/Aluguel/general%20osorio%20aluguel/OsorioFachada.jpg', 'https://raw.githubusercontent.com/lccalebe/projetofinal-mod5-imobiliaria-resilia/master/imobiliaria_m5/src/assets/Aluguel/general%20osorio%20aluguel/OsorioCozinha.jpg2'),
    (5, 'GENERAL ESPIRITO SANTO CARDOSO,80',1300, 001, 'CASA', 470, 490, 'https://raw.githubusercontent.com/lccalebe/projetofinal-mod5-imobiliaria-resilia/master/imobiliaria_m5/src/assets/Aluguel/general%20espirito%20santo%20cardoso(aluguel)/GeneralFachada.jpg', 'https://raw.githubusercontent.com/lccalebe/projetofinal-mod5-imobiliaria-resilia/master/imobiliaria_m5/src/assets/Aluguel/general%20espirito%20santo%20cardoso(aluguel)/GeneralGarden.jpg'),
    (6, 'GETULIO VARGAS,400',1600, 004, 'LOFT', 150, 580, 'https://raw.githubusercontent.com/lccalebe/projetofinal-mod5-imobiliaria-resilia/master/imobiliaria_m5/src/assets/Aluguel/Getulio%20Vaargas%20aluguel/GetulioFachada.jpg', 'https://raw.githubusercontent.com/lccalebe/projetofinal-mod5-imobiliaria-resilia/master/imobiliaria_m5/src/assets/Aluguel/Getulio%20Vaargas%20aluguel/GetulioSala.jpg')
`

function criaTabelaAlg() {
    db.run(ALUGUEL_SCHEMA, (error) => {
        if (error) console.log("Erro ao criar tabela de aluguel");
    });
}


function populaTabelaAlg() {
    db.run(ADD_ALUGUEL_DATA, (error) => {
        if (error) console.log(error);
    });
}
//FINAL CREATE POPULATE ALUGUEL
//INICIO CREATE POPULATE CORRETOR
const CORRETORES_SCHEMA = `
CREATE TABLE IF NOT EXISTS "CORRETORES" (
    "ID" INTEGER PRIMARY KEY AUTOINCREMENT,
    "NOME" varchar(64),
    "EMAIL" varchar(64),
    "SENHA" varchar(64),
    "CODIGO" varchar(64),
    "COMICAOPORVENDA" varchar(64)
    );`;

const ADD_CORRETORES_DATA = `
INSERT INTO CORRETORES (ID, NOME, EMAIL, SENHA, CODIGO, COMICAOPORVENDA)
VALUES 
    (1, 'Eliane Cristina', 'eugenio.oliveira@bol.com.br', '*******','*******',10),
    (2, 'Jocelia Oliveira', 'joceliahora@gmail.com', '********','*******',10),
    (3, 'Lucas Caleb', 'mirtes_fl@yahoo.com', '********','*******',10),
    (4, 'Luciana Vivarelli', 'lucianavivarelli@hotmail.com', '********','*******',10),
    (5, 'Raphael Victor', 'Jão_fl@yahoo.com', '********','*******',10),
    (6, 'Moises Furtado', 'Moises_fl@yahoo.com', '********','*******',10)
`

function criaTabelaUsr() {
    db.run(CORRETORES_SCHEMA, (error) => {
        if (error) console.log("Erro ao criar tabela de corretores");
    });
}


function populaTabelaUsr() {
    db.run(ADD_CORRETORES_DATA, (error) => {
        if (error) console.log(error);
    });
}
//FINAL CREATE POPULATE CORRETOR
//INICIO CREATE POPULATE VENDAS
const vendasSchemas = `
    CREATE TABLE IF NOT EXISTS "VENDAS" (
    "ID" INTEGER PRIMARY KEY AUTOINCREMENT,
    "TIPO" VARCHAR(64),
    "VALOR" VARCHAR(64),
    "ENDEREÇO" VARCHAR(64),
    "QUARTOS" INT,
    "BANHEIROS" INT,
    "GARAGEM" INT,
    "TAMANHO" VARCHAR(64),
    "IMG1"  VARCHAR(512),
    "IMG2" VARCHAR(512),
    "IMG3" VARCHAR(512)
);`;

function criaTabelaVendas () {
    db.run(vendasSchemas, (error) => {
        if (error) console.log('Erro ao criar tabela vendas.');
    })
}

const ADD_VENDAS_DATA = `
 INSERT INTO VENDAS(ID, TIPO, VALOR, ENDEREÇO, QUARTOS, BANHEIROS, GARAGEM, TAMANHO, IMG1, IMG2, IMG3) VALUES
(1, 'CASA', 'R$150000,00', 'RUA CASTELO MONALISA, 465, FORTALEZA, CE', 2, 1, 1,  '48M²', 'https://raw.githubusercontent.com/lccalebe/projetofinal-mod5-imobiliaria-resilia/master/imobiliaria_m5/src/assets/Vendas/Castelo%20Monalisa%20Venda/MonalisaFachada.jpg', '', 'https://github.com/lccalebe/projetofinal-mod5-imobiliaria-resilia/blob/jocelia2/imobiliaria_m5/src/assets/Vendas/Castelo%20Monalisa%20Venda/quarto_monalisa.jpg'),
(2, 'APARTAMENTO', 'R$28000,00' , 'RUA CHICO LEMOS, 4005, RIO DE JANEIRO, RJ', 4, 3, 2, '100M²', 'https://raw.githubusercontent.com/lccalebe/projetofinal-mod5-imobiliaria-resilia/master/imobiliaria_m5/src/assets/Vendas/Chico%20Lemos%20Vendas/LemosFachada.jpg', 'https://raw.githubusercontent.com/lccalebe/projetofinal-mod5-imobiliaria-resilia/master/imobiliaria_m5/src/assets/Vendas/Chico%20Lemos%20Vendas/LemosQuarto.jpg', 'https://raw.githubusercontent.com/lccalebe/projetofinal-mod5-imobiliaria-resilia/master/imobiliaria_m5/src/assets/Vendas/Chico%20Lemos%20Vendas/LemosQuarto2.jpg'),
(3, 'CASA', 'R$350000,00', 'RUA MAESTRO LISBOA, 1005, RIO DE JANEIRO, RJ', 3, 2, 1, '80M²', 'https://raw.githubusercontent.com/lccalebe/projetofinal-mod5-imobiliaria-resilia/master/imobiliaria_m5/src/assets/Vendas/Rua%20Maestro%20Lisboa%20venda/MaestroFachada.jpg', 'https://raw.githubusercontent.com/lccalebe/projetofinal-mod5-imobiliaria-resilia/master/imobiliaria_m5/src/assets/Vendas/Rua%20Maestro%20Lisboa%20venda/MaestroQuarto.jpg', 'https://raw.githubusercontent.com/lccalebe/projetofinal-mod5-imobiliaria-resilia/master/imobiliaria_m5/src/assets/Vendas/Rua%20Maestro%20Lisboa%20venda/MaestroSala.jpg'),
(4, 'CASA', 'R$110000,00', 'RUA XESQUE, 465, NATAL, RS', 2, 2, 1, '75M²', 'https://raw.githubusercontent.com/lccalebe/projetofinal-mod5-imobiliaria-resilia/master/imobiliaria_m5/src/assets/Vendas/Rua%20Xesque%20(Venda)/SalaXesque.jpg', 'https://raw.githubusercontent.com/lccalebe/projetofinal-mod5-imobiliaria-resilia/master/imobiliaria_m5/src/assets/Vendas/Rua%20Xesque%20(Venda)/XesqueFachada.jpg', 'https://raw.githubusercontent.com/lccalebe/projetofinal-mod5-imobiliaria-resilia/master/imobiliaria_m5/src/assets/Vendas/Rua%20Xesque%20(Venda)/XesqueFachada.jpg'),
(5, 'CASA', 'R$110000,00', 'RUA BEIRA MAR, 46, RIO DE JANEIRO, RJ', 4, 5, 1, '100M²', 'https://raw.githubusercontent.com/lccalebe/projetofinal-mod5-imobiliaria-resilia/master/imobiliaria_m5/src/assets/Vendas/Rua%20beira%20mar/BeiraMarCozinha.jpg', 'https://raw.githubusercontent.com/lccalebe/projetofinal-mod5-imobiliaria-resilia/master/imobiliaria_m5/src/assets/Vendas/Rua%20beira%20mar/BeiraMarFachada.jpg', 'https://raw.githubusercontent.com/lccalebe/projetofinal-mod5-imobiliaria-resilia/master/imobiliaria_m5/src/assets/Vendas/Rua%20beira%20mar/BeiraMarSalaCanto.jpg')
  `

function populaTabelaVendas () {
    db.run(ADD_VENDAS_DATA, (error) => {
        if(error) console.log('Error ao popular tabela vendas.');
    })
}
//FINAL CREATE POPULATE VENDAS

// a sequencia que devem ser executadas as tabelas
db.serialize(() => {
    criaTabelaClientes();
    populaTabelaClientes();
    criaTabelaAdm();
    populaTabelaAdm();
    criaTabelaAlg();
    populaTabelaAlg();
    criaTabelaUsr();
    populaTabelaUsr();
    criaTabelaVendas();
    populaTabelaVendas();
});
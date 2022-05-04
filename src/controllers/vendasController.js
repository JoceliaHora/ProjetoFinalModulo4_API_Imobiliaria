
const venda = require('../models/vendasModel');
const vendasDAO = require('../DAO/vendasDAO');

const vendas = (app, db) => {
    const DAOvendas = new vendasDAO(db);
    //CREATE
    app.post('/vendas', (req, res) => {
        const body = req.body;
        const vendasDado = new venda(body.id, body.tipo, body.valor, body.endereço, body.quartos, body.banheiros, body.garagem, body.tamanho);
        const data = async() => {
            try {
                const vendas = await DAOvendas.insereVenda(vendasDado)
                res.send(vendas)
            }catch(err) {
                res.send(err)
            }
        }
        data()      
    });
    
    //READ
    app.get('/vendas', (req, res) => {
        const data = async() => {
            try {
                const vendas = await DAOvendas.listaVenda()
                res.send(vendas)
            }catch(err) {
                res.send(err)
            }
        }
        data() 
    });

    app.get('/vendas/:id', (req, res) => {
        const id = req.params.id;
        const data = async() => {
            try {
                const vendas = await DAOvendas.listaVendaID(id)
                res.send(vendas)
            }catch(err) {
                res.send(err)
            }
        }
        data() 
    })

    //UPDATE
    app.put('/vendas/:id', (req, res) => {
        const body = req.body;
        const id = req.params.id;
        const parametros = [body.TIPO, body.VALOR, body.ENDEREÇO, body.QUARTOS, body.BANHEIROS, body.GARAGEM, body.TAMANHO, id];
        const data = async() => {
            try {
                const vendas = await DAOvendas.altereVenda(parametros)
                res.send(vendas)
            }catch(err) {
                res.send(err)
            }
        }
        data() 
    });
/*
    app.patch('/vendas/:id', (req, res) => {
        const body = req.body;
        const id = req.params.id;
        const data = async() => {
            try {
                const vendaDado = await DAOvendas.listarVendaID(id);
                const VendaDado = new venda(body.tipo || vendaDado[0].TIPO,
                    body.valor || vendaDado[0].VALOR,
                    body.endereço || vendaDado[0].ENDEREÇO,
                    body.quartos || vendaDado[0].QUARTOS,
                    body.banheiros || vendaDado[0].BANHEIROS,
                    body.garagem || vendaDado[0].GARAGEM,
                    body.tamanho|| vendaDado[0].TAMANHO);
                const parametros = [vendaDado.tipo, vendaDado.valor, vendaDado.endereço, vendaDado.quartos, vendaDado.banheiros, vendaDado.garagem, vendaDado.tamanho, id];
                const vendas = await DAOvendas.altereVenda(parametros)
                res.send(vendas)
                console.log(vendaDado)
            }catch(err) {
                res.send(err)
            }
        }
        data() 
    });
*/
    //DELETE
    app.delete('/vendas/:id', (req, res) => {
        const id = req.params.id;
        const data = async() => {
            try {
                const vendas = await DAOvendas.deleteVenda(id)
                res.send(vendas)
            }catch(err) {
                res.send(err)
            }
        }
        data()         
    });
}

module.exports = vendas;
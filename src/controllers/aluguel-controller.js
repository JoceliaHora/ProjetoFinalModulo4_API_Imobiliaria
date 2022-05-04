const bd = require('../infra/sqlite-db');
const Aluguel = require('../models/aluguel-model')
const DaoAluguel = require('../DAO/aluguel-dao');
const { Console } = require('console');

const aluguel = (app) => {

    const AluguelDao = new DaoAluguel(bd)
    //read no crud
    app.get('/aluguel', (req, res) => {
        const data = async () => {
            try {
                const Aluguel = await AluguelDao.listarAluguel()
                res.send(Aluguel)
            } catch {
                res.send("erro")
            }
        }
        data()
    })
    //create no crud
    app.post('/aluguel', (req, res) => {
        const body = req.body
        const DadosNovoAluguel = new Aluguel(body.endereco, body.valor, body.corretorid, body.alugueltipo, body.proprietarioid, body.inquilinoid)
        const data = async () => {
            try {
                const Aluguel = await AluguelDao.insereAluguel(DadosNovoAluguel)
                res.send(Aluguel)
            } catch {
                res.send("erro")
            }
        }
        data()
    })
    //update no crud
    app.put('/aluguel/:id', (req, res) => {
        const body = req.body;
        const id = req.params.id
        const parametros = [body.ENDERECO, body.VALOR, body.CORRETORESID, body.ALUGUELTIPO, body.PROPRIETARIOID, body.INQUILINOID, id]
        const data = async() => {
            try {
                const Aluguel =  await AluguelDao.altereAluguel(parametros)
                res.send(Aluguel)
            }catch(err) {
                res.send(err)
                console.log (err)
            }
        

        }
        data()


    })
    // delete crud
    app.delete('/aluguel/:id', (req, res) => {
        const id = req.params.id
        console.log(id)
        const data = async () => {
            try {
                const Aluguel = await AluguelDao.deletaAluguel(id)
                res.send(Aluguel)
            } catch {
                res.send("erro")
            }
        }
        data()
    })
}

module.exports = aluguel;
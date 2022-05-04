const bd = require('../infra/sqlite-db');
const Corretor = require('../modells/corretores-model')
const DaoCorretor = require('../DAO/corretores-dao')

const corretores = (app) => {

    const CorretorDao = new DaoCorretor(bd)
    //read no crud
    app.get('/corretores', (req, res) => {
        const data = async () => {
            try {
                const Corretores = await CorretorDao.listarCorretores()

                res.send(Corretores)
            } catch (err) {
                res.send(err)
            }
        }
        data()
    })

    //create no crud
    app.post('/corretores', (req, res) => {
        const body = req.body
        const DadosNovoCorretor = new Corretor(body.nome || body.NOME, body.email || body.EMAIL, body.senha || body.SENHA, body.codigo || body.CODIGO, body.comicaoporvenda || body.COMICAOPORVENDA)
        const data = async () => {
            try {
                const Corretores = await CorretorDao.insereCorretores(DadosNovoCorretor)
                res.send(Corretores)
            } catch {
                res.send("erro")
            }
        }
        data()
    })
    //UPDATE DO CRUD - ATUALIZAR REGISTROS
    app.put('/Corretores/:id', (req, res) => {
        const body = req.body;
        const id = req.params.id
        const parametros = [body.NOME, body.EMAIL, body.SENHA, body.CODIGO, body.COMICAOPORVENDA, id]
        console.log(parametros)
        const data = async () => {
            try {
                const corretores = await CorretorDao.altereCorretores(parametros)
                res.send(corretores)
            } catch (err) {
                res.send(err)                
            }
        }
        data()
    })

    // delete crud
    app.delete('/corretores/:id', (req, res) => {
        const id = req.params.id
        const data = async () => {
            try {
                const Corretores = await CorretorDao.deletaCorretores(id)
                res.send(Corretores)
            } catch {
                res.send("erro")
            }
        }
        data()
    })
}

module.exports = corretores;
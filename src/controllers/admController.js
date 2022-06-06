const Adm = require('../modells/admModel');

const AdmDAO = require('../DAO/admDAO');

const AdmController = (app, db) => {
    

    const admDAO = new AdmDAO(db);
    //CREATE
    app.post('/adm', (req, res) => {
        console.log("inserindo...")
        const body = req.body;
        const admDado = new Adm(body.tipoPlano || body.TIPOPLANO, body.tempoContrato || body.TEMPOCONTRATO, body.taxaServico || body.TAXASERVICO, body.seguroIncluso || body.SEGUROINCLUSO);
        const data = async() => {
            try {
                const adnServico = await admDAO.insereAdm(admDado)
                res.send(adnServico)
            }catch(err) {
                res.send(err)
            }
        }
        data()      
    });
    
    //READ
    app.get('/adm', (req, res) => {
        const data = async() => {
            try {
                const admServicos = await admDAO.listarAdm()
                res.send(admServicos)
            }catch(err) {
                res.send(err)
            }
        }
        data() 
    });

    app.get('/adm/:id', (req, res) => {
        const id = req.params.id;
        const data = async() => {
            try {
                const admServicos = await admDAO.listarAdmID(id)
                res.send(admServicos)
            }catch(err) {
                res.send(err)
            }
        }
        data() 
    })

    //UPDATE
    app.put('/adm/:id', (req, res) => {
        const body = req.body;
        const id = req.params.id;
        const parametros = [body.tipoPlano || body.TIPOPLANO, body.tempoContrato || body.TEMPOCONTRATO, body.taxaServico || body.TAXASERVICO, body.seguroIncluso || body.SEGUROINCLUSO, id];
        const data = async() => {
            try {
                const admServicos = await admDAO.altereAdm(parametros)
                res.send(admServicos)
            }catch(err) {
                console.log(err)
                res.send(err)
            }
        }
        data() 
    });

    //DELETE
    app.delete('/adm/:id', (req, res) => {
        const id = req.params.id;
        const data = async() => {
            try {
                const admServicos = await admDAO.deleteAdm(id)
                res.send(admServicos)
            }catch(err) {
                res.send(err)
            }
        }
        data()         
    });
}

module.exports = AdmController;
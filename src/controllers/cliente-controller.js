// Cliente - CRUD
const Cliente = require('../modells/cliente-model');
const ClienteDAO = require('../DAO/cliente-dao');

const cliente = (app, bd)=>{
    const DAOCliente = new ClienteDAO(bd);
    // Create do CRUD - POST - INSERE REGISTROS NO BANCO:
    app.post('/cliente', (req, res) => {
        // armazenando os dados no banco:
        const body = req.body;
        const ClienteDado = new Cliente(body.nome || body.NOME, body.cpf || body.CPF, body.telefone || body.TELEFONE, body.endereco || body.ENDERECO, body.tipoDeImovel || body.TIPODEIMOVEL, body.condicaoDoImovel || body.CONDICAODOIMOVEL, body.email || body.EMAIL, body.senha || body.SENHA)
        const data = async() => {
            try{
                const clientes = await DAOCliente.inserirClientes(ClienteDado)
                res.send(clientes)
            }catch(err){
                res.send(err);
            }
        }
        data()
    })

    // Read do CRUD - READ - EXIBE REGISTROS
    app.get('/cliente', (req, res) => {
        const data = async() => {
            try{
                const clientes = await DAOCliente.listarCliente();
                res.send(clientes)
            }catch(err){
                res.send(err);
            }
        }
        data()
    })

    // READ - EXIBE REGISTROS POR PARAMETROS
    app.get('/cliente/:id', (req, res) => {
        const id = req.params.id;
        const data = async() => {
            try{
                const clientes = await DAOCliente.listarClienteID(req.params.id);
                res.send(clientes)
                console.log(clientes)
            }catch(err){
                res.send(err);
                console.log(err)
            }
        }
        data()
    })

    // Update do CRUD - UPDATE - ATUALIZA REGISTROS
    app.put('/cliente/:id', (req, res) => {
        const body = req.body;
        const id = req.params.id;
        const Parametros =[body.nome || body.NOME, body.cpf || body.CPF, body.telefone || body.TELEFONE, body.endereco || body.ENDERECO, body.tipoDeImovel || body.TIPODEIMOVEL, body.condicaoDoImovel || body.CONDICAODOIMOVEL, body.email || body.EMAIL, body.senha || body.SENHA, id]
        const data = async() => {
            try{
                const clientes = await DAOCliente.alterarClientes(Parametros);
                res.send(clientes)
            }catch(err){
                res.send(err);
            }
        }
        data()
    })

    // Update com patch - para selecionar qual atributo vai alterar:
    app.patch('/cliente/:id', (req, res) => {
        const body = req.body;
        const id = req.params.id;
        const data = async() => {
            try{
                const clienteDado = await DAOCliente.listarClienteID(id);
                const ClienteDado = new Cliente(
                    body.nome || clienteDado[0].NOME,
                    body.cpf || clienteDado[0].CPF,
                    body.telefone || clienteDado[0].TELEFONE, 
                    body.endereco || clienteDado[0].ENDERECO,
                    body.tipoDeImovel || clienteDado[0].TIPODEIMOVEL,
                    body.condicaoDoImovel || clienteDado[0].CONDICAODOIMOVEL, 
                    body.email || clienteDado[0].EMAIL,
                    body.senha || clienteDado[0].SENHA)
                const Parametros =[ClienteDado.nome, ClienteDado.cpf, ClienteDado.telefone, ClienteDado.endereco, ClienteDado.tipoDeImovel, 
                        ClienteDado.condicaoDoImovel, ClienteDado.email, ClienteDado.senha, id]
                const clientes = await DAOCliente.alterarClientes(Parametros)
                res.send(clientes)
                console.log(clienteDado)
            }catch(err){
                res.send(err)
                console.log(err)
            }
        }
        data()
    })

     // Delete do CRUD - DELETAR - DELETA REGISTROS
    app.delete('/cliente/:id', (req, res) => {
        const data = async() => {
            try{
                const clientes = await DAOCliente.deletarClientes(req.params.id)
                res.send(clientes)
            }catch(err){
                res.send(err)
            }
        }
        data()
    })
}

module.exports = cliente;
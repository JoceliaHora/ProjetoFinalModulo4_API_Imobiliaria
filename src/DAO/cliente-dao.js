class ClienteDAO{
    constructor(bd){
        this.bd = bd;
    }
    listarCliente(){
        return new Promise((resolve, reject) => {
            this.bd.all(`SELECT * FROM CLIENTES`, (erro, results)=>{
                if(erro){
                    reject(erro)
                }else{
                    resolve(results)
                }
            })
        })
    }

    listarClienteID(id){
        return new Promise((resolve, reject)=>{
            this.bd.all(`SELECT * FROM CLIENTES WHERE ID=${id}`, (erro, results)=>{
                if(erro){
                    reject(erro);
                }else{
                    resolve(results);
                }
            })
        })
    }

    inserirClientes(NovoCliente){
        return new Promise((resolve, reject) => {
            this.bd.run(`INSERT INTO CLIENTES (NOME, CPF, TELEFONE, ENDERECO, TIPO_DE_IMOVEL, CONDICAO_DO_IMOVEL, EMAIL, SENHA) VALUES (?,?,?,?,?,?,?,?)`,
            [NovoCliente.nome, NovoCliente.cpf, NovoCliente.telefone, NovoCliente.endereco, NovoCliente.tipoDeImovel, NovoCliente.condicaoDoImovel, NovoCliente.email, NovoCliente.senha],
            (error)=>{
                if(error){
                    reject(error.message);
                }else{
                    resolve("Cliente Cadastrado com Sucesso!");
                }
            })
        })
    }

    alterarClientes(Parametros){
        return new Promise((resolve, reject)=>{
            this.bd.run(`UPDATE CLIENTES SET NOME = ?, CPF = ?, TELEFONE = ?, ENDERECO = ?, TIPO_DE_IMOVEL = ?, CONDICAO_DO_IMOVEL = ?, EMAIL = ?, SENHA = ? WHERE id = ?`, Parametros, (error)=>{
                if(error){
                    reject(error);
                }else{
                    resolve("Alterado com sucesso!");
                }
            })
        })
    }

    deletarClientes(id){
        return new Promise((resolve, reject)=>{
            this.bd.run(`DELETE FROM CLIENTES WHERE ID = ${id}`, (error)=>{
                if(error){
                    reject(error);
                }else{
                    resolve("Excluído com sucesso!");
                }
            })
        })
    }
}

module.exports = ClienteDAO;
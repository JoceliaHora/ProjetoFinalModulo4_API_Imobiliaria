class CorretoresDAO {
    constructor(bd) {
        this.bd = bd
    }

    listarCorretores() {
        return new Promise((resolve, reject) => {
            this.bd.all(`SELECT * FROM CORRETORES`, (error, result) => {
                if (error) {
                    console.log(error)
                    reject(error);
                } else {
                    resolve(result);
                }
            })
        })
    }

    insereCorretores(novoCorretores) {
        return new Promise((resolve, reject) => {
            this.bd.run(`INSERT INTO CORRETORES (NOME, EMAIL, SENHA, CODIGO, COMICAOPORVENDA) VALUES (?,?,?,?,?)`,
                [novoCorretores.nome, novoCorretores.email, novoCorretores.senha, novoCorretores.codigo, novoCorretores.comicaoporvenda],
                (error) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve("DEU CERTO INSERIR")
                    }
                })
        })
    }
    altereCorretores(Parametros) {
        return new Promise((resolve, reject) => {
            this.bd.run(`UPDATE CORRETORES SET NOME = ?, EMAIL = ?, SENHA = ?, CODIGO = ?, COMICAOPORVENDA = ? WHERE ID = ?`, Parametros, (error) => {
                if (error) {

                    reject(error);
                } else {
                    resolve("ALTERADO COM SUCESSO!")
                }
            })
        })

    }

    deletaCorretores(id) {
        return new Promise((resolve, reject) => {
            this.bd.run(`DELETE FROM CORRETORES WHERE ID=${id}`,
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve('Corretor deletado com sucesso')
                    }
                })
        })
    }


}



module.exports = CorretoresDAO 
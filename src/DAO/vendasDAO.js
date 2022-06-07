class vendasDAO {
    constructor(db) {
        this.db = db;
    }
    listaVenda(){
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * FROM VENDAS`, (error, results) =>{
                if(error){
                    reject(error)
                }else{
                    resolve(results)
                }
            })
        })
    }
    listaVendaID(id){
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * FROM VENDAS WHERE ID = ${id}`, (error, results) =>{
                if(error){
                    reject(error)
                }else{
                    resolve(results)
                }
            })
        })
    }
    insereVenda(novaVenda){
        return new Promise((resolve, reject) => {
            this.db.run(`INSERT INTO VENDAS(TIPO, VALOR, ENDEREÇO, QUARTOS, BANHEIROS, GARAGEM, TAMANHO, IMG1, IMG2, IMG3) VALUES( ?, ?, ?, ?, ? ,? ,?, ?, ?, ?)`,
            [novaVenda.tipo, novaVenda.valor, novaVenda.endereço, novaVenda.quartos, novaVenda.banheiros, novaVenda.garagem, novaVenda.tamanho, novaVenda.img1, novaVenda.img2, novaVenda.img3],
            (error) => {
                console.log("Deu certo")

                if(error) {
                    reject(error);
                }else {
                    resolve("Dados inseridos com sucesso");
                }
            })
        })

    }
    altereVenda(parametros){
        return new Promise((resolve, reject) => {
            this.db.run(`UPDATE VENDAS SET TIPO = ?, VALOR = ?, ENDEREÇO = ?, QUARTOS = ?, BANHEIROS = ?, GARAGEM = ?, TAMANHO = ?, IMG1 = ?, IMG2 = ?, IMG3 = ? WHERE ID = ?`, parametros, (error) => {
                if(error) {
                    reject(error);
                }else {
                    resolve("Atualizado com sucesso.")
                }
            })
        })
    }
    deleteVenda(id){
        return new Promise((resolve, reject) => {
            this.db.run(`DELETE FROM VENDAS WHERE ID = ${id}`, (error) => {
                if(error) {
                    reject(error);
                }else {
                    resolve("Deletado com sucesso.")
                }
            })
        })
    }
}

module.exports = vendasDAO;
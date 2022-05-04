class AluguelDAO{
    constructor(bd){
        this.bd = bd
    }

    listarAluguel(){
      return new Promise((resolve,reject)=>{
          this.bd.all(`SELECT * FROM ALUGUEL`, (error, result)=>{
            if(error){
               reject(error);
            }else{
                resolve(result);
            }
        })
      })
    }

    insereAluguel(novoAluguel){
        return new Promise( (resolve,reject)=>{
            this.bd.run(`INSERT INTO ALUGUEL (ENDERECO, VALOR, CORRETORID, ALUGUELTIPO, PROPRIETARIOID, INQUILINOID ) VALUES (?,?,?,?,?,?)`, 
            [novoAluguel.endereco, novoAluguel.valor, novoAluguel.corretorid, novoAluguel.alugueltipo, novoAluguel.proprietarioid, novoAluguel.inquilinoid],
            (error)=>{
                if(error){
                   reject(error)
                }else{
                   resolve("DEU CERTO INSERIR")
                }
            })
        })
    }
    altereAluguel(Parametros){
        return new Promise((resolve, reject) =>{
            this.bd.run(`UPDATE ALUGUEL SET ENDERECO = ?, VALOR = ? , CORRETORID = ?, ALUGUELTIPO = ?, PROPRIETARIOID = ?, INQUILINOID = ?  WHERE id = ?`, Parametros ,(error)=>{
            if(error){
                console.log(error)
               reject(error);
            }else{
               resolve("ALTERADO COM SUCESSO!")
            }
        })
    })

    }

    deletaAluguel(id) {
        return new Promise((resolve, reject) => {
            this.bd.run(`DELETE FROM ALUGUEL WHERE ID=${id}`,
            (err) => {
                if(err) {
                    reject(err)
                } else {
                    resolve('Aluguel deletado com sucesso')
                }
            })
        })
    }


}



module.exports = AluguelDAO
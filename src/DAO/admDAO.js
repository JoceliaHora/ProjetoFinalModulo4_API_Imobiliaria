class AdmDAO{
    constructor(bd){
        this.bd = bd;
    }
    listarAdm(){
        return new Promise((resolve, reject) =>{
            this.bd.all(`SELECT * FROM ADM`, (err, results) => {
                if(err){
                    reject(err)
                }else{
                    resolve(results)
                }
            })
        })
    }

    listarAdmID(id){
        return new Promise((resolve, reject) =>{
            this.bd.all(`SELECT * FROM ADM WHERE ID=${id}`, (err, results) => {
                if(err){
                   reject(err)
                }else{
                   resolve(results)
                }
            })
        })

    }

    insereAdm(novoAdm){
        return new Promise((resolve, reject) =>{
            this. bd.run(`INSERT INTO ADM (TIPOPLANO , TEMPOCONTRATO, TAXASERVICO, SEGUROINCLUSO ) VALUES (?, ?, ?, ?)`,
            [ novoAdm.tipoPlano,  novoAdm.tempoContrato,  novoAdm.taxaServico,  novoAdm.seguroIncluso],(error)=>{
                if(error){
                   reject(error);
                }else{
                   resolve("INSERIDO COM SUCESSO!")
                }
            })  
        })
    }

    altereAdm(Parametros){
        return new Promise((resolve, reject) =>{
            this.bd.run(`UPDATE ADM SET TIPOPLANO = ?, TEMPOCONTRATO = ?, TAXASERVICO = ?, SEGUROINCLUSO = ? WHERE id = ?`, Parametros ,(error)=>{
            if(error){
                console.log(error)
               reject(error);
            }else{
               resolve("ALTERADO COM SUCESSO!")
            }
        })
    })

    }
    deleteAdm(id){
        return new Promise((resolve, reject) =>{
            this.bd.run(`DELETE FROM ADM WHERE ID = ${id}`,(error)=>{
                if(error){
                   reject(error);
                }else{
                   resolve("DELETADO COM SUCESSO!")
                }
            })
        })
    }

}

module.exports = AdmDAO;
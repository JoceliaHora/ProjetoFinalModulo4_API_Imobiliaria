// Criando a classe cliente
class Cliente{ 
    constructor(nome, cpf, telefone, endereco, tipoDeImovel, condicaoDoImovel, email, senha){
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
        this.endereco = endereco;
        this.tipoDeImovel = tipoDeImovel;
        this.condicaoDoImovel = condicaoDoImovel;
        this.email = email;
        this.senha = this.validarSenha(senha);
    }

    // Condições para validar cadastro:
    validarSenha(senha) {
        if(senha.length >= 5){
            return senha;
        }else{
            throw new Error ("Senha deve ter 5 caracteres")
        }
    }
}

module.exports = Cliente;
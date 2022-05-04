class venda {
    constructor(id, tipo, valor, endereço, quartos, banheiros, garagem, tamanho){
        this.id = id;
        this.tipo = tipo;
        this.valor = valor;
        this.endereço = endereço;
        this.quartos = quartos;
        this.banheiros = banheiros;
        this.garagem = garagem;
        this.tamanho = tamanho;
    }
}

module.exports = venda;
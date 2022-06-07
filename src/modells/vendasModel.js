class venda {
    constructor(tipo, valor, endereço, quartos, banheiros, garagem, tamanho, img1, img2, img3){
        this.tipo = tipo;
        this.valor = valor;
        this.endereço = endereço;
        this.quartos = quartos;
        this.banheiros = banheiros;
        this.garagem = garagem;
        this.tamanho = tamanho;
        this.img1 = img1;
        this.img2 = img2;
        this.img3 = img3;
    }
}

module.exports = venda;
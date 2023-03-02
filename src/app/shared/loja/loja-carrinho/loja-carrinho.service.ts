import { LojaCarrinho } from '../loja-model/loja-carrinho-model';

export class LojaCarrinhoService {

  limpar(): void {
    localStorage.removeItem('carrinho');
  }
  adicionarProduto(produto: LojaCarrinho): void {
    let carrinho = this.buscarCarrinhoStorage();
    if (!carrinho) {
      carrinho = new Array<LojaCarrinho>();
      carrinho.push(produto);
    } else {
      const itemExiste = carrinho.find(el => el.idProduto === produto.idProduto);
      if (!itemExiste) {
        carrinho.push(produto);

      } else if ((itemExiste.quantidadeSelecionada + produto.quantidadeSelecionada) < itemExiste.quantidadeDisponivel) {
        itemExiste.quantidadeSelecionada = produto.quantidadeSelecionada + itemExiste.quantidadeSelecionada;
      }
    }
    this.atualizarCarrinhoStorage(carrinho);
  }

  removerProduto(produto: LojaCarrinho): void {
    const carrinho = this.buscarCarrinhoStorage();
    carrinho.splice(carrinho.indexOf(produto), 1);
    this.atualizarCarrinhoStorage(carrinho);
  }

  total(): any {
    const carrinho = this.buscarCarrinhoStorage();
    return carrinho.map(el => (el.quantidadeSelecionada * el.valor))
      .reduce((prev, value) => prev + value, 1);
  }

  buscarCarrinhoStorage(): Array<LojaCarrinho> {
    return (JSON.parse(localStorage.getItem('carrinho')) as Array<LojaCarrinho>);
  }
  atualizarCarrinhoStorage(carrinho: Array<LojaCarrinho>): void {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }

  quantidadeDeProdutos(): number {
    const carrinho = this.buscarCarrinhoStorage();
    return !carrinho ? 0 : carrinho.map(el => el.quantidadeSelecionada).reduce((prev, value) => prev + value, 0);
  }



}

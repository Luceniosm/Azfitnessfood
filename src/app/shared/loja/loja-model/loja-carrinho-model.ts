import { LojaProdutoImagem } from './loja-produto-imagem.model';

export class LojaCarrinho {
  idProduto: string;
  titulo: string;
  valor: number;
  quantidadeSelecionada: number;
  quantidadeDisponivel: number;
  imagem: LojaProdutoImagem;

  constructor(IdProduto: string, Titulo: string, Valor: number, QuantidadeSelecionada: number, QuantidadeDisponivel: number,  Imagem: LojaProdutoImagem) {
    this.idProduto = IdProduto;
    this.titulo = Titulo;
    this.valor = Valor;
    this.quantidadeSelecionada = QuantidadeSelecionada;
    this.quantidadeDisponivel = QuantidadeDisponivel;
    this.imagem = Imagem;
  }
}

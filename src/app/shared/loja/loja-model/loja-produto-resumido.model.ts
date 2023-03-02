import { LojaProdutoImagem } from './loja-produto-imagem.model';

export class LojaProdutoResumido {
  idProduto: string;
  titulo: string;
  valor: number;
  quantidadeDisponivel: number;
  quantidadeSelecionada: number;
  imagem: LojaProdutoImagem;
}

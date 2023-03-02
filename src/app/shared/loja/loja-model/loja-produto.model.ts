import { LojaProdutoImagem } from './loja-produto-imagem.model';

export class LojaProduto {
  idProduto: string;
  idCategoria: string;
  titulo: string;
  descricao: string;
  sabor: string;
  peso: string;
  marca: string;
  valor: number;
  taxaDeEntrega: number;
  quantidadeDisponivel: number;
  quantidadeSelecionada: number;
  imagens: Array<LojaProdutoImagem>;
}

import { LojaCadastroProdutoImagem } from './loja-cadastro-produto-imagem.model';

export class LojaCadastroProduto {
  idProduto: String;
  idCategoria: String;
  titulo: String;
  descricao: String;
  sabor: String;
  peso: String;
  marca: String;
  valor: number;
  quantidadeDisponivel: number;
  ativo: boolean;
  imagens = Array<LojaCadastroProdutoImagem>();
}

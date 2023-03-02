import { PedidoProdutoImagem } from './pedido-produto-imagem.model';

export class PedidoItemResumo {
  IdPedidoItem: string;
  descricaoProduto: string;
  quantidade: number;
  valor: number;
  imagem: PedidoProdutoImagem;
}

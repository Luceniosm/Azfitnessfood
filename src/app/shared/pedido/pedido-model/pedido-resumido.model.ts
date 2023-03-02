import { PedidoItemResumo } from './pedido-item-resumo.model';
import { EStatusPedido } from './pedido-status.enum';

export class PedidoResumo {
  idPedido: string;
  dataPedido: Date;
  statusPedido: EStatusPedido;
  itens: Array<PedidoItemResumo>;
  endereco: string;
  formaDePagamento: string;
}

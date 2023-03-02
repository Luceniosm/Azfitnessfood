import { RelatorioEntregaItemContratado } from './relatorio-entrega-item-contratado.model';

export class RelatorioEntregaCliente {
  nomeCliente: string;
  quantidadeRefeicao: number;
  tipoPacote: string;
  endereco: string;
  telefone: string;
  valorPagamento: number;
  formaPagamento: string;
  observacaoPedido: string;
  observacaoPacote: string;
  opcaoCarpadio: string;
  lgPrimeiroPedido: boolean;
  complementos: Array<RelatorioEntregaItemContratado>;
}


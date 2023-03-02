import { EntregadorItemContratado } from './entregador-item-contratado.model';

export class EntregadorEntregaCliente {
  nomeCliente: string;
  telefone: string;
  endereco: string;
  valorPagamento: number;
  formaPagamento: string;
  tipoPacote: string;

  quantidadeRefeicao: number;
  descricaoRefeicao: string;
  quantidadeSalada: number;
  descricaoSalada: string;
  quantidadeRefeicaoAdicional: number;
  descricaoRefeicaoAdicional: string;

  opcaoCarpadio: string;
  observacaoPedido: string;
  lgPacoteDiario: boolean;
  ultimoDiaPedido: string;

  lgPrimeiroPedido: boolean;
  lgDinheiro: boolean;
  nomePacote: string;

  complementos: Array<EntregadorItemContratado>;
}

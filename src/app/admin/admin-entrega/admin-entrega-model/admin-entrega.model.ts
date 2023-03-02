import { ItemContradato } from './admin-entrega-item-contratado.model';

export class Entrega {
  idContratacaoPacote: string;
  idEntrega: string;
  idEntregador: string;
  idEndereco: string;
  idCliente: string;
  nomeCliente: string;
  quantidadeRefeicao: number;
  formaDePagamento: string;
  endereco: string;
  nomeEntregador: string;
  lgAntecipacao: boolean;
  lgRetiradaNoLocal: boolean;
  lgPago: boolean;
  complementos: Array<ItemContradato>;
}

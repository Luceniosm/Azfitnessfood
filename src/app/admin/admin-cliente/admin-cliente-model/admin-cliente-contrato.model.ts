import { ComplementosContratado } from './admin-cliente-contrato-complemento-contratado.model';
import { ClientePedido } from './admin-cliente-pedido.model';
export class ClienteContrato {
  idContratacaoPacote: string;
  idUsuarioContratacaoPacote: string;
  idPacote: string;
  dataInclusao: Date;
  descricaoPacote: string;
  quantidade: number;
  nomeEntregador: string;
  telefoneEntregador: string;
  valor: number;
  lgCancelado: boolean;
  pedidos: Array<ClientePedido>;
  contratoPacoteComplementos: Array<ComplementosContratado>;
  dataInicioPacote: Date;
  idFormaDePagamento: string;
  lgRetiradaLocal: boolean;
  lgRevonacaoAutomatica: boolean;
  lgTermoAceito: boolean;
  observacao: string;
  valorContratado: number;
}

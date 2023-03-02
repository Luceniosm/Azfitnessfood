import { EntregadorEntregaCliente } from './entregador-entrega-cliente.model';

export class EntregadorEntrega {
  idEntregador: string;
  nomeEntregador: string;
  clientes: Array<EntregadorEntregaCliente>;
}

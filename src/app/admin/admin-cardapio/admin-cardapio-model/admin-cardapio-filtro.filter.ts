import { FiltroBase } from 'src/app/models/filtro-base/filtro-base.filter';

export class FiltroCardapio extends FiltroBase {
  descricao: string;
  dtPedidoIni: string;
  dtPedidoFim: string;

  constructor(skip: number = 0, take: number = 10, fieldOrder: string = 'dataPedido', lgOrdeByAscending: boolean = false) {
    super();
    this.fieldOrder = fieldOrder;
    this.lgOrdeByAscending = lgOrdeByAscending;
    this.skip = skip;
    this.take = take;
  }
}

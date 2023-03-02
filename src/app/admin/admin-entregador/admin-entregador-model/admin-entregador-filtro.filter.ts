import { FiltroBase } from '../../../models/filtro-base/filtro-base.filter';

export class FiltroEntregador extends FiltroBase {
  nome: string;
  placa: string;

  constructor(skip: number = 0, take: number = 10, fieldOrder: string = 'nome', lgOrdeByAscending: boolean = true) {
    super();
    this.fieldOrder = fieldOrder;
    this.lgOrdeByAscending = lgOrdeByAscending;
    this.skip = skip;
    this.take = take;
  }
}

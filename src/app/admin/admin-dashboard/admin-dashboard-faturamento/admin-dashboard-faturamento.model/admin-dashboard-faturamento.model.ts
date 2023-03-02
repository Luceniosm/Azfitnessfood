import { FaturamentoAnual } from './admin-dashboard-faturamento-anual.model';

export class Faturamento {
  valorDiario: number;
  valorSemanal: number;
  valorMensal: number;
  valorAnual: number;
  faturamentosAnoAtual: Array<FaturamentoAnual>;
  faturamentosAnoAnterior: Array<FaturamentoAnual>;
}

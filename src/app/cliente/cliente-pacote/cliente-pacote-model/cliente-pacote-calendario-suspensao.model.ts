import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export class CalendarioSuspensao {
  dataIncialPacote: NgbDate;
  dataFimPacote: NgbDate;
  navegacao: string;
  outsideDays: string;
  diasDePedido: Array<NgbDate>;
  diasSuspenso: Array<NgbDate>;
  diasAntecipacao: Array<NgbDate>;
}

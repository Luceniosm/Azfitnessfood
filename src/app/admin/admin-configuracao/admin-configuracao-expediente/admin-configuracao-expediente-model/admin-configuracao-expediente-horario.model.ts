import { Time } from '@angular/common';
import { DiaDaSemana } from './admin-configuracao-expediente-dia-da-semana.model';


export class Horario {
  idHorarioDaSemana: string;
  descricao: string;
  horaInicio: Time;
  horaFim: Time;
  diasDaSemana: Array<DiaDaSemana>;

  constructor(IdHorarioDaSemana: string, Descricao: string, HoraInicio: Time, HoraFim: Time, DiasDaSemana: Array<DiaDaSemana>) {
    this.idHorarioDaSemana = IdHorarioDaSemana;
    this.descricao = Descricao;
    this.horaInicio = HoraInicio;
    this.horaFim = HoraFim;
    this.diasDaSemana = DiasDaSemana;
  }
}

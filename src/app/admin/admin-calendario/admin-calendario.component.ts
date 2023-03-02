import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGrigPlugin from '@fullcalendar/timegrid';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdminCalendarioService } from './admi-calendario.service';
import { ExcecaoAtendimento } from './admin-calendario-model/admin-calendario-excecao-atendimento.model';
import { Calendario } from './admin-calendario-model/admin.calendario.model';
import * as _ from 'underscore';


@Component({
  selector: 'app-admin-calendario',
  templateUrl: './admin-calendario.component.html',
  styleUrls: ['./admin-calendario.component.css']
})

export class AdminCalendarioComponent implements OnInit {
  @ViewChild('calendario', { static: false }) calendario: FullCalendarComponent;
  dataSelecionada: Date;
  modalRef: BsModalRef;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  datasCalendario: Array<EventInput>;
  excecaoAtendimento: ExcecaoAtendimento;
  excecoesAtendimento: Array<ExcecaoAtendimento>;

  constructor(
    private modalService: BsModalService,
    private adminCalendarioService: AdminCalendarioService
  ) { }

  ngOnInit() {
    this.datasCalendario = new Array<EventInput>();
    this.carregarEventos();
  }
  carregarEventos() {
    this.adminCalendarioService.carregarDatasExcecaoPorAno(new Date().getFullYear()).subscribe(sub => {
      if (sub.success) {
        this.excecoesAtendimento = sub.data as Array<ExcecaoAtendimento>;
        this.excecoesAtendimento.forEach(element => {
          this.datasCalendario = [...this.datasCalendario, {
            id: element.idDiaExcecaoAtendimento,
            title: element.descricao,
            start: new Date(element.dataDaExcecao),
            allDay: true
          }];
        });
      }
    });
  }

  handleDateClick(arg: any, template: TemplateRef<any>) {
    this.excecaoAtendimento = undefined;
    this.dataSelecionada = arg.dateStr;
    this.modalRef = this.modalService.show(template);
  }

  eventClick(item: any, template: TemplateRef<any>) {
    this.excecaoAtendimento = this.excecoesAtendimento.find(el => el.idDiaExcecaoAtendimento === item.event.id as Calendario);
    this.modalRef = this.modalService.show(template);
  }

  adicionarEventEmit(item: any) {
    this.datasCalendario = [...this.datasCalendario, { allDay: true, ...item }];
  }

  atualizarEventEmit(data: ExcecaoAtendimento) {
    const atualizar = this.datasCalendario.find(el => el.id === data.idDiaExcecaoAtendimento);
    this.datasCalendario = _.without(this.datasCalendario, atualizar);

    atualizar.title = data.descricao;
    atualizar.atendimento = data.atendimento;
    this.datasCalendario = [...this.datasCalendario, atualizar];
  }

  excluirEventEmit(data: ExcecaoAtendimento) {
    this.datasCalendario = this.datasCalendario.filter(el => el.id !== data.idDiaExcecaoAtendimento);
  }
}

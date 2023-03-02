import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGrigPlugin from '@fullcalendar/timegrid';
import { Guid } from 'guid-typescript';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as _ from 'underscore';
import { ClientePedido } from '../admin-cliente-model/admin-cliente-pedido.model';

@Component({
  selector: 'app-admin-cliente-contrato-pedido',
  templateUrl: './admin-cliente-contrato-pedido.component.html',
  styleUrls: ['./admin-cliente-contrato-pedido.component.css']
})
export class AdminClienteContratoPedidoComponent implements OnInit {
  @Input() pedidos: Array<ClientePedido>;
  @Input() idContratacaoPacote: string;
  @ViewChild('calendario', { static: false }) calendario: FullCalendarComponent;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  datasCalendario: Array<EventInput>;
  dataInicio: any;
  dataSelecionada: Date;
  modalRef: BsModalRef;
  pedidoSelecionado: ClientePedido;

  constructor(
    private datepipe: DatePipe,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    if (this.pedidos.length > 0) {
      this.carregarDatas();
    }
  }

  carregarDatas(): void {
    this.datasCalendario = new Array<EventInput>();
    this.pedidos.forEach(el => {
      if (el.lgAntecipado) {
        this.datasCalendario = [... this.datasCalendario, {
          id: el.idPedido,
          title: 'Antecipação',
          start: el.dataPedido,
          allDay: true,
          color: '#17a2b8'
        }];
      } else if (el.lgSuspenso) {
        this.datasCalendario = [... this.datasCalendario, {
          id: el.idPedido,
          title: 'Suspenso',
          start: el.dataPedido,
          allDay: true,
          color: '#ffc107'
        }];
      } else if (el.lgAtivo) {
        this.datasCalendario = [... this.datasCalendario, {
          id: el.idPedido,
          title: 'Normal',
          start: el.dataPedido,
          allDay: true,
          color: '#6c757d'
        }];
      }
    });
  }


  inserirEmit(item: ClientePedido): void {
    if (item.idPedido === Guid.createEmpty().toString()) {
      this.pedidos.push(item);
      this.carregarDatas();
    } else {
      this.pedidos = this.pedidos.filter(el => el.idPedido !== item.idPedido);
      this.pedidos.push(item);
      this.carregarDatas();
    }
  }

  ordenarPorData(pedidos: Array<ClientePedido>): Array<ClientePedido> {
    return _.sortBy(pedidos, function (item) {
      return item.dataPedido;
    });
  }

  handleDateClick(arg: any, template: TemplateRef<any>) {
    this.pedidoSelecionado = undefined;
    this.dataSelecionada = arg.dateStr;
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  eventClick(item: any, template: TemplateRef<any>) {
    this.pedidoSelecionado = this.pedidos.find(el => el.idPedido === item.event.id);
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  excluirEventEmit() {
    this.pedidos = this.pedidos.filter(el => el.idPedido !== this.pedidoSelecionado.idPedido);
    this.pedidoSelecionado = undefined;
    this.carregarDatas();
  }

  setData(): Date {
    return this.pedidos.length > 0 ?  this.pedidos[0].dataPedido : new Date();
  }
}

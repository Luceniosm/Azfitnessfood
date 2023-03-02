import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RelatorioEntregaRequest } from './relatorio-entrega-model/relatorio-entrega-request.model';
import * as moment from 'moment';
import { Guid } from 'guid-typescript';
import { RelatorioService } from '../relatorio.service';
import { RelatorioEntrega } from './relatorio-entrega-model/relatorio-entrega.model';
import { RelatorioEntregaCliente } from './relatorio-entrega-model/relatorio-entrega-cliente.model';
import { Location } from '@angular/common';
import * as _ from 'underscore';
@Component({
  selector: 'app-entrega',
  templateUrl: './entrega.component.html',
  styleUrls: ['./entrega.component.css']
})
export class EntregaComponent implements OnInit {
  request: RelatorioEntregaRequest;
  entregas: Array<RelatorioEntrega> = [];
  recibos: Array<RelatorioEntregaCliente> = [];
  dataHoje: string;

  constructor(
    public rotaAtual: ActivatedRoute,
    private relatorioService: RelatorioService,
    private location: Location
  ) { }

  ngOnInit() {
    moment.locale('pt-br');
    this.dataHoje = moment().format('LL');
    this.carregarRelatorioCliente();
  }

  carregarRelatorioCliente() {
    this.rotaAtual.params.subscribe(async (params: Params) => {
      const dataMoment = moment(params['data'], 'YYYY-MM-DD');

      this.request = {
        dataInicial: new Date(dataMoment.format('YYYY-MM-DD')),
        dataFinal: new Date(dataMoment.format('YYYY-MM-DD')),
        idEntregador: Guid.createEmpty().toString(),
        idTipoPacote: Guid.createEmpty().toString()
      };

      if (params['idEntregador'] !== Guid.createEmpty().toString()) {
        this.request.idEntregador = params['idEntregador'];
      }

      if (params['idTipoPacote'] !== Guid.createEmpty().toString()) {
        this.request.idTipoPacote = params['idTipoPacote'];
      }


      this.buscarEntregas();
    });
  }

  buscarEntregas() {
    this.relatorioService.consultarEntregas(this.request)
      .subscribe(el => {
        if (el.success) {
          this.entregas = <Array<RelatorioEntrega>>el.data;
          this.entregas.forEach(e => {
            const clientes = e.clientes.filter(ft => ft.lgPrimeiroPedido);
            if (clientes.length > 0) {
              clientes.forEach(cl => { this.recibos.push(cl); });
            }
          });
          setTimeout(() => {
            this.imprimir();
          }, 2000);
        }
      });
  }

  imprimir() {
    window.print();
  }
  voltar() {
    this.location.back();
  }
}

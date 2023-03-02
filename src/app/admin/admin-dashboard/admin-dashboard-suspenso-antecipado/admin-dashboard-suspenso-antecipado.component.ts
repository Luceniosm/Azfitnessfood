import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from '../admin-dashboard-service.';
import { Pedido } from './admin-dashboard-suspenso-antecipado-model/admin-dashboard-suspenso-antecipado-pedidos.model';
import { EStatus } from './admin-dashboard-suspenso-antecipado-model/admin-dashboard-suspenso-antecipado-status.enum';

@Component({
  selector: 'app-admin-dashboard-suspenso-antecipado',
  templateUrl: './admin-dashboard-suspenso-antecipado.component.html',
  styleUrls: ['./admin-dashboard-suspenso-antecipado.component.css']
})
export class AdminDashboardSuspensoAntecipadoComponent implements OnInit {
  contadorDelistagemSuspenso = 1;
  contadorDelistagemAntecipado = 1;
  pedido: Pedido;
  status = EStatus;
  date = new Date;

  constructor(
    private adminDashboardService: AdminDashboardService,
    private datepipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.obterPedidosSuspensosAntecipados();
  }

  obterPedidosSuspensosAntecipados(): void {
    this.adminDashboardService.obterPedidosSuspensosAntecipados(
      this.datepipe.transform(this.date, 'yyyy-MM-dd'),
    ).subscribe(_ => {
      if (_.success) {
        this.pedido = _.data;
        this.pedido.clientesAntecipados = this.pedido.clientesAntecipados.filter(
          (thing, i, arr) => arr.findIndex(t => t.nome === thing.nome) === i
        );

      }
    });
  }

  downloadClientesPedidosSuspensos(): void {
    this.adminDashboardService.exportarClientesPedidosSuspensosOuAntecipadosXls(
      this.datepipe.transform(this.date, 'yyyy-MM-dd'),
      this.status.Suspenso
    ).subscribe(_ => {
      this.downloadFile(_);
    });
  }

  downloadClientesPedidosAntecipados(): void {
    this.adminDashboardService.exportarClientesPedidosSuspensosOuAntecipadosXls(
      this.datepipe.transform(this.date, 'yyyy-MM-dd'),
      this.status.Antecipado
    ).subscribe(_ => {
      this.downloadFile(_);
    });
  }

  downloadFile(_: any): void {
    const newBlob = new Blob([_], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(newBlob);
      return;
    }
    const data = window.URL.createObjectURL(newBlob);

    const link = document.createElement('a');
    link.href = data;
    link.download = 'Pedidos_' + this.datepipe.transform(new Date, 'dd-MM-yyyy') + '.xls';
    // this is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

    setTimeout(function () {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(data);
      link.remove();
    }, 100);
  }

}

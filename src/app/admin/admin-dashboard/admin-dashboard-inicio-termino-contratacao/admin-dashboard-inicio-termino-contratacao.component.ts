import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from '../admin-dashboard-service.';
import { Contratacao } from './admin-dashboard-inicio-termino-contratacao.model/admin-dashboard-inicio-termino-contratacao.model';
@Component({
  selector: 'app-admin-dashboard-inicio-termino-contratacao',
  templateUrl: './admin-dashboard-inicio-termino-contratacao.component.html',
  styleUrls: ['./admin-dashboard-inicio-termino-contratacao.component.css']
})
export class AdminDashboardInicioTerminoContratacaoComponent implements OnInit {
  encerradoContador = 1;
  novoContador = 1;
  date = new Date;
  contratacao: Contratacao;
  constructor(
    private adminDashboardService: AdminDashboardService,
    private datepipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.obterContratadosNovosEncerradosPorData();
  }

  obterContratadosNovosEncerradosPorData(): void {
    this.adminDashboardService.obterContratadosNovosEncerradosPorData(
      this.datepipe.transform(this.date, 'yyyy-MM-dd')
    )
      .subscribe(_ => {
        if (_.success) {
          this.contratacao = _.data;
        }
      });
  }

  downloadContratosNovos(): void {
    this.adminDashboardService.exportarContratoNovosXls(
      this.datepipe.transform(this.date, 'yyyy-MM-dd')
    ).subscribe(_ => {
      this.downloadFile(_);
    });
  }

  downloadContratosEncerrados(): void {
    this.adminDashboardService.exportarContratoEncerradosXls(
      this.datepipe.transform(this.date, 'yyyy-MM-dd')
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
    link.download = 'Contratos_' + this.datepipe.transform(new Date, 'dd-MM-yyyy') + '.xls';
    // this is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

    setTimeout(function () {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(data);
      link.remove();
    }, 100);
  }
}

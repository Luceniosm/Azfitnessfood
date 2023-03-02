import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from '../admin-dashboard-service.';
import { EnderecoAlteracao } from './admin-dashboard-endereco-alterado-model/admin-dashboard-endereco-alterado.model';

@Component({
  selector: 'app-admin-dashboard-endereco-alterado',
  templateUrl: './admin-dashboard-endereco-alterado.component.html',
  styleUrls: ['./admin-dashboard-endereco-alterado.component.css']
})
export class AdminDashboardEnderecoAlteradoComponent implements OnInit {
  enderecoContador = 1;
  enderecos: Array<EnderecoAlteracao>;
  date = new Date;
  constructor(
    private adminDashboardService: AdminDashboardService,
    private datepipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.obterEnderecosAlterados();
  }
  obterEnderecosAlterados(): void {
    this.adminDashboardService.obterEnderecoAlteradoNoExpediente().subscribe(_ => {
      if (_.success) {
        this.enderecos = _.data;
      }
    });
  }

  downloadClientesComEnderecoAlterado(): void {
    this.adminDashboardService.exportarEntregasComAlteracaoEnderecoExpedienteXls().subscribe(_ => {
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
    link.download = 'Contratos_' + this.datepipe.transform(this.date, 'dd-MM-yyyy') + '.xls';
    // this is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

    setTimeout(function () {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(data);
      link.remove();
    }, 100);
  }

}

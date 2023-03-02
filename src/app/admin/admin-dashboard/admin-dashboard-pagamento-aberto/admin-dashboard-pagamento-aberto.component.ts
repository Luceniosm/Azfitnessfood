import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BalaoConfirmacaoService } from 'src/app/shared/balao-confirmacao/balao-confirmacao.service';
import { AdminDashboardService } from '../admin-dashboard-service.';
import { PagamentosEmAberto } from './admin-dashboard-pagamento-aberto-model/admin-dashboard-pagamento-aberto.model';

@Component({
  selector: 'app-admin-dashboard-pagamento-aberto',
  templateUrl: './admin-dashboard-pagamento-aberto.component.html',
  styleUrls: ['./admin-dashboard-pagamento-aberto.component.css']
})
export class AdminDashboardPagamentoAbertoComponent implements OnInit {
  contadorDelistagem = 1;
  pagamentosEmAberto: Array<PagamentosEmAberto>;
  constructor(
    private adminDashboardService: AdminDashboardService,
    private balaoConfirmacaoService: BalaoConfirmacaoService,
    private toastr: ToastrService,
    private datepipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.obterPagamentosAberto();
  }

  obterPagamentosAberto(): void {
    this.adminDashboardService.obterPagamentosAberto().subscribe(_ => {
      if (_.success) {
        this.pagamentosEmAberto = _.data;
      }
    });
  }

  notificarConfirmacaoPagamento(item: PagamentosEmAberto) {
    this.balaoConfirmacaoService.confirm(
      {
        message: 'Dejesa confirmar o Pagamento do ' + item.nomeCliente + '?',
        btnOkText: 'Sim',
        btnCancelText: 'Não'
      }
    ).subscribe((result) => result ? this.confirmarPagamento(item.idContratacaoPacote) : null);
  }

  confirmarPagamento(idContratacaoPacote: string) {
    this.adminDashboardService.confirmarPagamento(idContratacaoPacote)
      .subscribe(_ => {
        if (_.success) {
          if (_.data) {
            if (_.success) {
              if (_.data) {
                this.toastr.success('Pagamento confirmado com sucesso!');
                this.obterPagamentosAberto();
              }
            }
          }
        }
      });
  }

  obterRecibo(idContratacaoPacote: string): void {
    this.adminDashboardService.exportarReciboDePagamentoPdf(idContratacaoPacote).subscribe(_ => {
      this.downloadFile(_, '.pdf');
    });
  }

  downloadPagamentosEmAberto(): void {
    this.adminDashboardService.exportarPagamentosAbertoXls().subscribe(_ => {
      this.downloadFile(_, '.xls');
    });
  }

  downloadFile(_: any, extension: any): void {
    const newBlob = new Blob([_], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(newBlob);
      return;
    }
    const data = window.URL.createObjectURL(newBlob);

    const link = document.createElement('a');
    link.href = data;
    link.download = 'Pagamentos Em Aberto_' + this.datepipe.transform(new Date, 'dd-MM-yyyy') + extension;
    // this is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

    setTimeout(function () {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(data);
      link.remove();
    }, 100);
  }

}

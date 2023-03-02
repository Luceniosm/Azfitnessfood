import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BalaoConfirmacaoService } from 'src/app/shared/balao-confirmacao/balao-confirmacao.service';
import { EStatusPedido } from 'src/app/shared/pedido/pedido-model/pedido-status.enum';
import { Util } from 'src/app/utils/util';
import { AdminDashboardService } from '../admin-dashboard-service.';
import { PedidoEmAberto } from './admin-dashboard-pedido-model/admin-dashboard-pedido.model';

@Component({
  selector: 'app-admin-dashboard-pedido',
  templateUrl: './admin-dashboard-pedido.component.html',
  styleUrls: ['./admin-dashboard-pedido.component.css']
})
export class AdminDashboardPedidoComponent implements OnInit {
  pedidosEmAberto: Array<PedidoEmAberto>;
  contadorDelistagem = 1;
  constructor(
    private adminDashboardService: AdminDashboardService,
    private balaoConfirmacaoService: BalaoConfirmacaoService,
    private toastr: ToastrService,
    private datepipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.obterPedidosPendente();
  }
  obterPedidosPendente(): void {
    this.adminDashboardService.obterPedidosPendente().subscribe(_ => {
      if (_.success) {
        this.pedidosEmAberto = _.data;
      }
    });
  }

  notificarCancelarPagamento(pedido: PedidoEmAberto): void {
    this.balaoConfirmacaoService.confirm(
      {
        message: 'Dejesa cancelar o pedido do ' + pedido.nomeCliente + '?',
        btnOkText: 'Sim',
        btnCancelText: 'Não'
      }
    ).subscribe((result) => result ? this.confirmarAcao(pedido.idPedido, EStatusPedido.cancelado, 'cancelado') : null);
  }

  notificarConfirmacaoEntrega(idPedido: string): void {
    this.balaoConfirmacaoService.confirm(
      {
        message: 'Dejesa confirmar o recebimento do pedido?',
        btnOkText: 'Sim',
        btnCancelText: 'Não'
      }
    ).subscribe((result) => result ? this.confirmarAcao(idPedido, EStatusPedido.entregue, 'confirmado') : null);
  }

  confirmarAcao(idPedido: string, status: EStatusPedido, msg: string): void {
    this.adminDashboardService.alterarStatusPedido(idPedido, status).subscribe(el => {
      if (el.success) {
        this.pedidosEmAberto = this.pedidosEmAberto.filter(rs => rs.idPedido !== idPedido);
        this.toastr.success(`Pedido ${msg} com sucesso!`);
      }
    });
  }

  downloadPedidosEmAberto(): void {
    this.adminDashboardService.exportarPedidosAbertoXls().subscribe(_ => {
      Util.downloadFile(_,
        '.xls',
        'Pedidos em Aberto - ' + this.datepipe.transform(new Date, 'dd-MM-yyyy'),
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    });
  }

  downloadPedidosEmAbertoPorId(idPedido: string): void {
    this.adminDashboardService.exportarPedidosAbertoPorPedidoXls(idPedido).subscribe(_ => {
      Util.downloadFile(_,
        '.xls',
        'Pedidos em Aberto - ' + this.datepipe.transform(new Date, 'dd-MM-yyyy'),
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    });
  }

}

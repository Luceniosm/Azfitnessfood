import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { AuthModel } from 'src/app/models/authentication/auth.model';
import { BalaoConfirmacaoService } from '../balao-confirmacao/balao-confirmacao.service';
import { PedidoItemResumo } from './pedido-model/pedido-item-resumo.model';
import { PedidoResumo } from './pedido-model/pedido-resumido.model';
import { EStatusPedido } from './pedido-model/pedido-status.enum';
import { PedidoService } from './pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  @Input() cssContainer = 'container mt-5 pt-5 pb-3 p-0';
  pedidos: Array<PedidoResumo>;
  user: AuthModel;
  idUser: string;
  public isCollapsed: boolean[] = [];
  constructor(
    private pedidoService: PedidoService,
    private authenticationService: AuthenticationService,
    private modalService: BsModalService,
    private balaoConfirmacaoService: BalaoConfirmacaoService,
    private toastr: ToastrService,
    private currentRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.user = this.authenticationService.currentUserValue;
    this.setUser();
    this.carregarPedidos();
  }

  setUser(): void {
    if (this.currentRouter?.routeConfig?.path === 'edicao/:id') {
      this.currentRouter.params.subscribe(async (params: Params) => {
        this.idUser = params['id'];
      });
    } else {
      this.idUser = this.user.user.idUsuario;
    }
  }


  carregarPedidos(): void {
    this.pedidoService.carregarPedidosPorUsuario(this.idUser).subscribe(_ => {
      if (_.success) {
        this.pedidos = _.data;
      }
    });
  }

  confirmarCancelarPedido(idPedido: string): void {
    this.balaoConfirmacaoService.confirm({
      message: 'Deseja cancelar o pedido selecionado?',
      btnOkText: 'Sim',
      btnCancelText: 'Não'
    }).subscribe((result) => result ? this.cancelarPedido(idPedido) : null);
  }

  cancelarPedido(idPedido: string): void {
    this.pedidoService.cancelarPedido(idPedido, EStatusPedido.cancelado).subscribe(el => {
      if (el.success) {
        this.pedidos.find((ped) => ped.idPedido === idPedido).statusPedido = 3;
        this.toastr.success('Pedido cancelado com sucesso!');
      }
    });
  }

  quantidadeDeProdutos(itens: Array<PedidoItemResumo>): number {
    return !itens ? 0 : itens.map(el => el.quantidade).reduce((prev, value) => prev + value, 0);
  }
  valorTotalProdutos(itens: Array<PedidoItemResumo>): number {
    return !itens ? 0 : itens.map(el => el.valor).reduce((prev, value) => prev + value, 0);
  }
}

import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { BalaoConfirmacaoService } from 'src/app/shared/balao-confirmacao/balao-confirmacao.service';
import * as _ from 'underscore';
import { ClienteFormaDePagamento } from '../admin-cliente-model/admin-cliente-contrato-forma-pagamento.model';
import { ClienteContrato } from '../admin-cliente-model/admin-cliente-contrato.model';
import { PacoteCategoriaComplemento } from '../admin-cliente-model/admin-cliente-pacote-categoria-complemento.model';
import { ClientePacote } from '../admin-cliente-model/admin-cliente-pacote.models';
import { ClientePedido } from '../admin-cliente-model/admin-cliente-pedido.model';
import { AdminClienteService } from '../admin-cliente.service';
@Component({
  selector: 'app-admin-cliente-contrato',
  templateUrl: './admin-cliente-contrato.component.html',
  styleUrls: ['./admin-cliente-contrato.component.css']
})
export class AdminClienteContratoComponent implements OnInit {
  contratoContador = 1;
  contratos: Array<ClienteContrato>;
  contrato: ClienteContrato;
  pacote: ClientePacote;
  idUsuario: string;
  visualizarPedidos: boolean;
  visualizarContrato: boolean;
  visualizarNovoContrato: boolean;
  pedidos: Array<ClientePedido>;
  descricaoPedido: string;
  idContratacaoPacote: string;
  formasDePagamento: Array<ClienteFormaDePagamento>;

  constructor(
    private adminClienteService: AdminClienteService,
    private currentRouter: ActivatedRoute,
    private toastr: ToastrService,
    private datepipe: DatePipe,
    private balaoConfirmacaoService: BalaoConfirmacaoService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.visualizarPedidos = false;
    this.visualizarContrato = false;
    this.listarContratos();
    this.carregarFormasDePagamento();
  }

  listarContratos() {
    if (this.currentRouter.routeConfig.path !== 'cadastro') {
      this.currentRouter.params.subscribe(async (params: Params) => {
        this.idUsuario = params['id'];
        this.adminClienteService.carregarContratos(params['id']).subscribe(el => {
          if (el.success) {
            this.contratos = el.data;
          }
        });
      });
    }
  }
  carregarPedidos(item: Array<ClientePedido>, descricaoPedido: string, idContratacaoPacote: string): void {
    this.descricaoPedido = descricaoPedido;
    this.pedidos = item;
    this.visualizarPedidos = true;
    this.idContratacaoPacote = idContratacaoPacote;
  }
  voltar(): void {
    this.pedidos = new Array<ClientePedido>();
    this.listarContratos();
    this.visualizarPedidos = false;
    this.visualizarContrato = false;
    this.visualizarNovoContrato = false;
  }

  periodo(pedidos: Array<ClientePedido>): string {
    if (pedidos.length === 1) {
      return this.datepipe.transform(_.first(pedidos).dataPedido, 'dd/MM/yyyy');
    }

    const ordenados = pedidos.sort((itemA, itemB) => {
      return <any>new Date(itemA.dataPedido) - <any>new Date(itemB.dataPedido);
    });
    return (
      this.datepipe.transform(_.first(ordenados).dataPedido, 'dd/MM/yyyy') + ' - ' +
      this.datepipe.transform(_.last(ordenados).dataPedido, 'dd/MM/yyyy')
    );
  }

  confirmarCancelamento(idContratacaoPacoteSelecionado: string) {
    this.balaoConfirmacaoService.confirm({
      message: 'Dejesa cancelar a contratação do pacote?',
      btnOkText: 'Sim',
      btnCancelText: 'Não'
    }).subscribe((result) => result ? this.cancelar(idContratacaoPacoteSelecionado) : null);
  }

  cancelar(idContratacaoPacoteSelecionado: string) {
    this.adminClienteService.cancelarContratacaoPacote(idContratacaoPacoteSelecionado).subscribe(result => {
      if (result.success) {
        this.toastr.success('Contratação do pacote cancelada com sucesso!');
        this.contratos.find(el => el.idContratacaoPacote === idContratacaoPacoteSelecionado).lgCancelado = true;
      } else {
        this.toastr.error('Erro ao cancelar a contratação do pacote!');
      }
    });
  }

  novoContrato(): void {
    this.visualizarNovoContrato = true;
    this.cookieService.set('admin',  this.idUsuario);
  }

  carregarContrato(idPacote: string, idContratacaoPacote: string): void {
    this.contrato = this.contratos.find(el => el.idContratacaoPacote === idContratacaoPacote);
    this.carregarPacote(idPacote);
  }
  carregarPacote(idPacote: string) {
    this.adminClienteService.carregarPacote(idPacote).subscribe(result => {
      if (result.success) {
        this.pacote = new ClientePacote();
        const pct = result.data as ClientePacote;
        pct.categorias.forEach(ctg => {
          ctg.complementos.forEach(compl => {
            this.alterarComplemento(compl);
          });
        });
        this.pacote = pct;
        this.visualizarContrato = true;
      }
    });
  }
  alterarComplemento(compl: PacoteCategoriaComplemento): void {
    this.contrato.contratoPacoteComplementos.forEach(complemento => {
      if (complemento.idComplementoDaCategoria === compl.idComplementoDaCategoria) {
        compl.quantidadeSelecionada = complemento.quantidade;
      }

      complemento?.idItensDoComplemento.forEach(itemComplemento => {
        const item = compl?.itensDoComplemento.find(el => el.idItemDoComplemento === itemComplemento);
        if (item !== undefined) {
          item.check = true;
        }
      });
    });
  }

  carregarFormasDePagamento() {
    this.adminClienteService.carregarFormasDePagamento().subscribe(formasDePagamento => {
      if (formasDePagamento.success) {
        this.formasDePagamento = <Array<ClienteFormaDePagamento>>formasDePagamento.data;
      }
    });
  }
}

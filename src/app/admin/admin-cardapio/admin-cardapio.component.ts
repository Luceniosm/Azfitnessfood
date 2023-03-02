import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BsModalRef } from 'ngx-bootstrap/modal/ngx-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { AdminCardapioService } from 'src/app/admin/admin-cardapio/admin-cardapio.service';
import { SortEvent } from 'src/app/utils/sortable.directive';
import { FiltroCardapio } from './admin-cardapio-model/admin-cardapio-filtro.filter';
import { AdminCardapioModel } from './admin-cardapio-model/admin-cardapio.model';
import { BalaoConfirmacaoService } from 'src/app/shared/balao-confirmacao/balao-confirmacao.service';

@Component({
  selector: 'app-admin-cardapio',
  templateUrl: './admin-cardapio.component.html',
  styleUrls: ['./admin-cardapio.component.css']
})

export class AdminCardapioComponent implements OnInit {
  modalRef: BsModalRef;
  cardapioForm: FormGroup;
  cardapios: Array<AdminCardapioModel>;
  filtroCardapio: FiltroCardapio = new FiltroCardapio();
  contadorDelistagem = 1;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private adminCardapioService: AdminCardapioService,
    private datepipe: DatePipe,
    private balaoConfirmacaoService: BalaoConfirmacaoService
  ) { }

  ngOnInit() {
    this.initForm();
    this.listarCardapio();
  }

  initForm(): void {
    this.cardapioForm = this.formBuilder.group({
      descricao: ['', [Validators.required]],
      dtPedidoIni: [this.datepipe.transform(new Date, 'yyyy-MM-dd'), [Validators.required]],
      dtPedidoFim: [this.datepipe.transform(new Date, 'yyyy-MM-dd'), [Validators.required]],
    });
  }

  novo(): void {
    this.router.navigate(['admin/cardapio/cadastro']);
  }

  copiar(data): void {
    this.router.navigate(['admin/cardapio/copiar', data]);
  }

  editar(data): void {
    this.router.navigate(['admin/cardapio/edicao', data]);
  }

  excluir(cardapioId: string) {
    this.adminCardapioService.removeCardapio(cardapioId).subscribe(_ => {
      if (_.success) {
        this.listarCardapio();
        this.toastr.success('Cardápio removido com sucesso!');
      } else {
        this.toastr.error('Um erro ocorreu na tentativa de exclusão do cardápio.');
      }
    });
  }

  confirmarExclusao(cardapioId: string) {
    this.toastr.clear();
    this.adminCardapioService.consultaPedidoCardapio(cardapioId).subscribe(_ => {
      if (_.success) {
        if (_.data.lenght > 0) {
          this.toastr.warning('Não é possível remover cardápios com pedidos vinculados!');
        } else {
          this.balaoConfirmacaoService.confirm({
            message: 'Dejesa confirmar a EXCLUSÃO do cardápio selecionado?',
            btnOkText: 'Sim',
            btnCancelText: 'Não'
          }).subscribe((result) => result ? this.excluir(cardapioId) : null);
        }
      }
    });
  }

  listarCardapio(): void {
    this.preencherFiltro();
    this.adminCardapioService.consultaListCardapio(this.filtroCardapio)
      .subscribe(_ => {
        if (_.success) {
          this.cardapios = _.data;
        }
      },
        error => {
          this.cardapios = [];
        });
  }

  preencherFiltro() {
    this.filtroCardapio.descricao = this.cardapioForm.get('descricao').value;
    this.filtroCardapio.dtPedidoIni = this.cardapioForm.get('dtPedidoIni').value;
    this.filtroCardapio.dtPedidoFim = this.cardapioForm.get('dtPedidoFim').value;
  }

  showButton(datapedido): boolean {
    return moment(datapedido) >= moment().startOf('day');
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SortEvent } from 'src/app/utils/sortable.directive';
import { FiltroEntregador } from './admin-entregador-model/admin-entregador-filtro.filter';
import { Entregador } from './admin-entregador-model/admin-entregador.model';
import { AdminServiceEntregador } from './admin-entregador.service';
import { BalaoConfirmacaoService } from 'src/app/shared/balao-confirmacao/balao-confirmacao.service';

@Component({
  selector: 'app-admin-entregador-listar',
  templateUrl: './admin-listar-entregador.component.html',
  styleUrls: ['./admin-listar-entregador.component.css']
})

export class AdminListarEntregadorComponent implements OnInit {

  form: FormGroup;
  entregadores: Entregador[] = [];
  filtroEntregador: FiltroEntregador = new FiltroEntregador();
  pageSize = this.filtroEntregador.take;
  page = 1;
  collectionSize = 0;

  constructor(
    private formBuilder: FormBuilder,
    private adminServiceEntregador: AdminServiceEntregador,
    private toastr: ToastrService,
    private router: Router,
    private balaoConfirmacaoService: BalaoConfirmacaoService
  ) { }

  ngOnInit() {
    this.buildForm();
    this.listar();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      nome: [''],
      placa: ['']
    });
  }

  listar() {
    this.preencherFiltro();
    this.adminServiceEntregador.consultarEntregadores(this.filtroEntregador)
      .subscribe(_ => {
        if (_.success) {
          this.entregadores = _.data.itens;
          this.collectionSize = _.data.totalItens;
        }
      });
  }

  preencherFiltro() {
    this.filtroEntregador.nome = this.form.get('nome').value;
    this.filtroEntregador.placa = this.form.get('placa').value;
  }

  limpar() {
    this.filtroEntregador = new FiltroEntregador();
    this.buildForm();
    this.listar();
    this.toastr.success('Campos do formulário resetados com sucesso.');
  }

  novo() {
    this.router.navigate(['admin/entregador/cadastro/']);
  }

  editar(entregadorId: string) {
    this.router.navigate(['admin/entregador/edicao/', entregadorId]);
  }

  excluir(entregadorId: string) {
    this.adminServiceEntregador.removerEntregador(entregadorId).subscribe(_ => {
      if (_.success) {
        this.toastr.success('Entregador removido com sucesso!');
        this.listar();
      } else {
        this.toastr.error('Um erro ocorreu na tentativa de exclusão do entregador.');
      }
    });
  }

  confirmarExclusao(entregadorId: string) {
    this.balaoConfirmacaoService.confirm(
      {
        message: 'Você realmente deseja excluir este entregador?',
        btnOkText: 'Sim',
        btnCancelText: 'Não'
      }
    ).subscribe((result) => result ? this.excluir(entregadorId) : null);
  }

  alterarPagina($event) {
    this.page = +$event;
    this.filtroEntregador.take = this.pageSize * $event;
    this.filtroEntregador.skip = this.filtroEntregador.take - this.pageSize;
    this.listar();
  }

  ordernar({ column, direction }: SortEvent) {
    if (direction !== '') {
      this.filtroEntregador.fieldOrder = column;
      this.filtroEntregador.lgOrdeByAscending = direction === 'asc' ? true : false;
      this.listar();
    }
  }
}

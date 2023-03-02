import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthModel } from 'src/app/models/authentication/auth.model';
import { UserModel } from 'src/app/models/authentication/user.model';
import { FiltroBase } from 'src/app/models/filtro-base/filtro-base.filter';
import { BalaoConfirmacaoService } from 'src/app/shared/balao-confirmacao/balao-confirmacao.service';
import { SortEvent } from 'src/app/utils/sortable.directive';
import { AdminService } from '../admin.service';
import { PacoteResumido } from './admin-pacote-model/admin-pacote-resumido.model';
import { AdminPacoteService } from './admin-pacote.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-admin-pacote',
  templateUrl: './admin-pacote.component.html',
  styleUrls: ['./admin-pacote.component.css']
})
export class AdminPacoteComponent implements OnInit {
  contadorDelistagem = 1;
  pacoteForm: FormGroup;
  filtroForm: FormGroup;
  pacotes: PacoteResumido[] = [];

  filtro = [];
  filtroPacote: FiltroBase = new FiltroBase();
  pageSize = 10;
  page = 1;
  collectionSize = 0;

  usuarioLogado: UserModel;
  idPacote: any;

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService,
    private router: Router,
    private balaoConfirmacaoService: BalaoConfirmacaoService,
    private adminPacoteService: AdminPacoteService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.listar();
    this.getUsuarioLogado();
  }
  buildForm(): void {
    this.filtroForm = this.formBuilder.group({
      descricao: ['', Validators.required],
      lgAtivo: ['true']
    });
  }

  listar() {
    this.adminPacoteService.carregarPacotes(this.filtroForm.getRawValue()).subscribe(result => {
      if (result.success) {
        this.pacotes = <Array<PacoteResumido>>result.data;
      }
    });
  }

  getUsuarioLogado() {
    this.usuarioLogado = (JSON.parse(localStorage.getItem('currentUser')) as AuthModel).user;
  }
  alterarPagina($event) {
    this.page = +$event;
    this.filtroPacote.take = this.pageSize * $event;
    this.filtroPacote.skip = this.filtroPacote.take - this.pageSize;
    this.listar();
  }
  ordernar({ column, direction }: SortEvent) {
    if (direction !== '') {
      this.filtroPacote.fieldOrder = column;
      this.filtroPacote.lgOrdeByAscending = direction === 'asc' ? true : false;
      this.listar();
    }
  }

  editar(idPacote: string) {
    this.router.navigate(['admin/pacote/editar/', idPacote]);
  }

  duplicar(idPacote: string) {
    this.router.navigate(['admin/pacote/duplicar/', idPacote]);
  }

  adicionar(idPacote: string) {
    this.router.navigate(['admin/pacote/adicionar/', idPacote]);
  }

  inativar(pacote: any) {
    this.balaoConfirmacaoService.confirm(
      {
        message: 'Deseja Inativar o pacote?',
        btnOkText: 'Sim',
        btnCancelText: 'Não'
      }
    ).subscribe((result) => result ? this.confirmarAtivarInativarPacote(pacote) : null);
  }

  ativar(pacote: any) {
    this.balaoConfirmacaoService.confirm(
      {
        message: 'Deseja Ativar o pacote?',
        btnOkText: 'Sim',
        btnCancelText: 'Não'
      }
    ).subscribe((result) => result ? this.confirmarAtivarInativarPacote(pacote) : null);
  }

  confirmarAtivarInativarPacote(pacote: PacoteResumido): void {
    this.adminPacoteService.ativarInativarPacote(pacote.idPacote, !pacote.lgAtivo).subscribe(result => {
      if (result.success) {
        this.listar();
      }
    });
  }
}

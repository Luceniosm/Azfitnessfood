import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SortEvent } from 'src/app/utils/sortable.directive';
import { AdminPacoteTipoPacote } from '../admin-pacote/admin-pacote-model/admin-pacote-tipo-pacote.model';
import { AdminService } from '../admin.service';
import { DadosCliente } from './admin-cliente-model/admin-cliente-dados-cliente.model';
import { FiltroCliente } from './admin-cliente-model/admin-cliente-filtro.filter';
import { CookieService } from 'ngx-cookie-service';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-admin-cliente',
  templateUrl: './admin-cliente.component.html',
  styleUrls: ['./admin-cliente.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class AdminClienteComponent implements OnInit {
  contadorDelistagem = 1;
  clienteForm: FormGroup;
  clientes = Array<DadosCliente>();
  tiposPacotes = Array<AdminPacoteTipoPacote>();
  filtroCliente: FiltroCliente = new FiltroCliente();

  pageSize = this.filtroCliente.take;
  page = 1;
  collectionSize = 0;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private toastr: ToastrService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  limpar() {
    this.filtroCliente = new FiltroCliente();
    this.buildForm();
    this.toastr.success('Campos do formulário resetados com sucesso.');
  }


  buildForm(): void {
    this.clienteForm = this.formBuilder.group({
      nome: [''],
      email: [''],
      telefone: ['']
    });
  }

  listar() {
    if (!this.preencherFiltro()) { return; }
    this.adminService.carregarUsuariosFiltro(this.filtroCliente)
      .subscribe(_ => {
        if (_.success) {
          this.clientes = <Array<DadosCliente>>_.data.itens;
          this.collectionSize = _.data.totalItens;
        }
      });
  }

  ordernar({ column, direction }: SortEvent) {
    if (direction !== '') {
      this.filtroCliente.fieldOrder = column;
      this.filtroCliente.lgOrdeByAscending = direction === 'asc' ? true : false;
      this.listar();
    }
  }

  alterarPagina($event) {
    this.page = +$event;
    this.filtroCliente.take = this.pageSize * $event;
    this.filtroCliente.skip = this.filtroCliente.take - this.pageSize;
    this.listar();
  }

  preencherFiltro(): boolean {
    this.filtroCliente.nome = this.clienteForm.get('nome').value;
    this.filtroCliente.email = this.clienteForm.get('email').value;
    this.filtroCliente.telefone = this.clienteForm.get('telefone').value;

    if (this.filtroCliente.nome === '' &&
      this.filtroCliente.email === '' &&
      this.filtroCliente.telefone === ''
    ) {
      return false;
    }
    return true;
  }

  editar(clienteId: string) {
    this.router.navigate(['admin/clientes/edicao/', clienteId]);
  }

  novo() {
    this.router.navigate(['admin/clientes/cadastro/']);
  }

  direcionarAcaoCliente(clienteId: string, nome: string) {
    this.cookieService.set('admin', clienteId);
    this.cookieService.set('nomeCliente', nome);
    this.router.navigate([`cliente/pacote/status/${clienteId}`]);
  }

  confirmarEmail(email: string): void {
    this.adminService.confirmarEmail(email)
      .subscribe(_ => {
        if (_.success) {
          this.toastr.success('Email confirmado com sucesso.');
        } else {
          this.toastr.error('Erro ao confirmar email.');
        }
      });
  }

  compraParaCliente(clienteId: string, nome: string) {
    this.cookieService.set('admin', clienteId);
    this.cookieService.set('nomeCliente', nome);
    this.router.navigate([`cliente/menu`]);
  }
}

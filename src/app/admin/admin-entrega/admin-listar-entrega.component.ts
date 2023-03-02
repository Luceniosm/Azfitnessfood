import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Guid } from 'guid-typescript';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { AuthModel } from 'src/app/models/authentication/auth.model';
import { UserModel } from 'src/app/models/authentication/user.model';
import { BalaoConfirmacaoService } from 'src/app/shared/balao-confirmacao/balao-confirmacao.service';
import { Entregador } from '../admin-entregador/admin-entregador-model/admin-entregador.model';
import { AdminServiceEntregador } from '../admin-entregador/admin-entregador.service';
import { AdminPacoteTipoPacote } from '../admin-pacote/admin-pacote-model/admin-pacote-tipo-pacote.model';
import { AdminService } from '../admin.service';
import { Entrega } from './admin-entrega-model/admin-entrega.model';
import { AdminServiceEntrega } from './admin-entrega.service';

@Component({
  selector: 'app-admin-entrega-listar',
  templateUrl: './admin-listar-entrega.component.html',
  styleUrls: ['./admin-listar-entrega.component.css']
})

export class AdminListarEntregaComponent implements OnInit {
  entregasContador = 1;
  form: FormGroup;
  formEntrega: FormGroup;
  entregadores = Array<Entregador>();
  entregas = Array<Entrega>();
  tiposPacotes = Array<AdminPacoteTipoPacote>();
  habilitarRelatorio: boolean;
  usuarioLogado = (JSON.parse(localStorage.getItem('currentUser')) as AuthModel).user;

  constructor(
    private adminServiceEntrega: AdminServiceEntrega,
    private adminServiceEntregador: AdminServiceEntregador,
    private adminService: AdminService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private balaoConfirmacaoService: BalaoConfirmacaoService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.listar();
    this.carregarTiposPacotes();
    this.carregarEntregadores();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      idTipoPacote: [''],
      nomeCliente: [''],
      idEntregador: [''],
      dataPedido: [moment().format('YYYY-MM-DD'), [Validators.required]]
    });

    this.formEntrega = this.formBuilder.group({
      idEntrega: [Guid.createEmpty().toString()],
      idContratacaoPacote: [{ value: '', disabled: true }],
      idEntregador: [''],
      idCliente: [''],
      nomeCliente: [{ value: '', disabled: true }],
      endereco: [{ value: '', disabled: true }],
      complemento: [{ value: '', disabled: true }],
      referencia: [{ value: '', disabled: true }],
      idEndereco: [{ value: '', disabled: true }],
      idUsuarioInclusao: [this.usuarioLogado.idUsuario],
    });
  }

  listar() {
    this.adminServiceEntrega.consultarEntregas(this.form.getRawValue())
      .subscribe(_ => {
        if (_.success) {
          this.entregas = _.data;
          this.validarEntregadores();
        }
      });
  }

  buscar(): void {
    this.entregasContador = 1;
    this.listar();
  }

  validarEntregadores() {
    this.habilitarRelatorio = this.entregas.some(el => el.idEntregador === Guid.createEmpty().toString());
    if (this.habilitarRelatorio) {
      this.toastr.warning('Existe cliente sem entregador, não é possível gerar relátorio de entrega');
    }
  }

  carregarTiposPacotes() {
    this.adminService.carregarTiposPacotes()
      .subscribe((result) => {
        if (result.success) {
          this.tiposPacotes = <Array<AdminPacoteTipoPacote>>result.data;
        }
      });
  }

  carregarEntregadores() {
    this.adminServiceEntregador.consultarTodosEntregadores()
      .subscribe(_ => {
        if (_.success) {
          this.entregadores = <Array<Entregador>>_.data;
        }
      });
  }

  limpar() {
    this.buildForm();
    this.listar();
    this.toastr.success('Campos do formulário resetados com sucesso.');
  }

  gerarRelatorio() {
    const idEntregador = this.form.value.idEntregador !== '' ? this.form.value.idEntregador : Guid.createEmpty();
    const idTipoPacote = this.form.value.idTipoPacote !== '' ? this.form.value.idTipoPacote : Guid.createEmpty();
    this.router.navigate([`/relatorio/entrega/` + this.form.value.dataPedido + '/' + idEntregador + '/' + idTipoPacote]);
  }


  alterarEntregador(item: Entrega, modal: any) {
    this.formEntrega.patchValue({
      idEntrega: item.idEntrega,
      idContratacaoPacote: item.idContratacaoPacote,
      nomeCliente: item.nomeCliente,
      endereco: item.endereco,
      idEntregador: item.idEntregador,
      idEndereco: item.idEndereco,
      idUsuarioInclusao: this.usuarioLogado.idUsuario,
      idCliente: item.idCliente
    });
    this.modalService.open(modal, { size: 'lg' });
  }

  atualizarGrid() {
    this.modalService.dismissAll();
    this.listar();
  }

  notificarConfirmacaoPagamento(item: Entrega) {
    this.balaoConfirmacaoService.confirm(
      {
        message: 'Dejesa confirmar o Pagamento do ' + item.nomeCliente + '?',
        btnOkText: 'Sim',
        btnCancelText: 'Não'
      }
    ).subscribe((result) => result ? this.confirmarPagamento(item) : null);
  }

  confirmarPagamento(item: Entrega) {
    this.adminServiceEntrega.confirmarPagamento(item.idContratacaoPacote)
      .subscribe(_ => {
        if (_.success) {
          if (_.data) {
            const entregaSucesso = this.entregas.find(el => el.idContratacaoPacote === item.idContratacaoPacote);
            entregaSucesso.lgPago = true;

            this.entregas = this.entregas.filter(el => el.idContratacaoPacote !== item.idContratacaoPacote);
            this.entregas.push(entregaSucesso);
          }
        }
      });
  }

  fecharModal() {
    this.modalService.dismissAll();
  }
}

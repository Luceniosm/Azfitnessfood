import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AuthModel } from 'src/app/models/authentication/auth.model';
import { BalaoConfirmacaoService } from 'src/app/shared/balao-confirmacao/balao-confirmacao.service';
import { ClientePedido } from '../admin-cliente-model/admin-cliente-pedido.model';
import { AdminClienteService } from '../admin-cliente.service';

@Component({
  selector: 'app-admin-cliente-contrato-pedido-modal',
  templateUrl: './admin-cliente-contrato-pedido-modal.component.html',
  styleUrls: ['./admin-cliente-contrato-pedido-modal.component.css']
})
export class AdminClienteContratoPedidoModalComponent implements OnInit {
  @Input() dataSelecionada: Date;
  @Input() modalRef: BsModalRef;
  @Input() pedidoSelecionado: ClientePedido;
  @Input() idContratacaoPacote: string;
  @Output() inserirEmit = new EventEmitter();
  @Output() excluirEventEmit = new EventEmitter();
  pedidoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private datepipe: DatePipe,
    private adminClienteService: AdminClienteService,
    private toastr: ToastrService,
    private balaoConfirmacaoService: BalaoConfirmacaoService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.carregarDados();
  }

  buildForm(): void {
    this.pedidoForm = this.formBuilder.group({
      idPedido: [Guid.createEmpty().toString()],
      tipoPedido: ['', [Validators.required, Validators.min(1)]],
      dataDoPedido: [this.dataSelecionada, [Validators.required]],
      observacao: [''],
      justificativa: [''],
      idUsuarioInclusao: [(JSON.parse(localStorage.getItem('currentUser')) as AuthModel).user.idUsuario]
    });
  }
  carregarDados() {
    if (this.pedidoSelecionado) {
      this.pedidoForm.patchValue({
        idPedido: this.pedidoSelecionado.idPedido,
        tipoPedido: this.carregarTipoPedido(),
        dataDoPedido: this.datepipe.transform(this.pedidoSelecionado.dataPedido, 'yyyy-MM-dd'),
        observacao: this.pedidoSelecionado.observacao,
        justificativa: this.pedidoSelecionado.justificativa
      });
    }
  }

  salvar() {
    const data = {
      idPedido: this.pedidoForm.get('idPedido').value,
      idContratacaoPacote: this.idContratacaoPacote,
      dataPedido: this.dataSelecionada,
      observacao: this.pedidoForm.get('observacao').value,
      justificativa: this.pedidoForm.get('justificativa').value,
      lgAtivo: this.pedidoForm.get('tipoPedido').value === '1' || this.pedidoForm.get('tipoPedido').value === '2',
      lgAntecipado: this.pedidoForm.get('tipoPedido').value === '2',
      lgSuspenso: this.pedidoForm.get('tipoPedido').value === '3',
      idUsuarioInclusao: this.pedidoForm.get('idUsuarioInclusao').value
    };

    if (data.idPedido === Guid.createEmpty().toString()) {
      this.adminClienteService.cadastrarPedido(data).subscribe(el => {
        if (el.success) {
          this.toastr.success('Cadastro de pedido com sucesso!');
          this.inserirEmit.emit(el.data);
          this.modalRef.hide();
        } else {
          this.toastr.success('Erro ao cadastrar pedido!');
        }
      });
    } else {
      this.adminClienteService.atualizarPedido(data).subscribe(el => {
        if (el.success) {
          this.toastr.success('Pedido atualizadocom sucesso!');
          this.inserirEmit.emit(el.data);
          this.modalRef.hide();
        } else {
          this.toastr.success('Erro ao atualizar pedido!');
        }
      });
    }
  }

  carregarTipoPedido(): string {
    let tipo = '1';
    if (this.pedidoSelecionado.lgAntecipado) {
      tipo = '2';
    } else if (this.pedidoSelecionado.lgSuspenso) {
      tipo = '3';
    }
    return tipo;
  }

  confirmarExclusao() {
    this.balaoConfirmacaoService.confirm({
      message: 'Dejesa confirmar a EXCLUSÃO?',
      btnOkText: 'Sim',
      btnCancelText: 'Não'
    }).subscribe((result) => result ? this.excluir() : null);
  }

  excluir() {
    this.adminClienteService.excluirPedido(this.pedidoForm.get('idPedido').value)
      .subscribe(sub => {
        if (sub.success) {
          this.toastr.success('Data excluida com suscesso!');
          this.excluirEventEmit.emit();
        } else {
          this.toastr.error('Erro ao excluir evento, tente novamente!');
        }
        this.modalRef.hide();
      });
  }
}

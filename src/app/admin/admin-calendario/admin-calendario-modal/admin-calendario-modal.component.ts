import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AdminCalendarioService } from '../admi-calendario.service';
import { ExcecaoAtendimento } from '../admin-calendario-model/admin-calendario-excecao-atendimento.model';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Guid } from 'guid-typescript';
import { Calendario } from '../admin-calendario-model/admin.calendario.model';
import { BalaoConfirmacaoService } from 'src/app/shared/balao-confirmacao/balao-confirmacao.service';

@Component({
  selector: 'app-admin-calendario-modal',
  templateUrl: './admin-calendario-modal.component.html',
  styleUrls: ['./admin-calendario-modal.component.css']
})
export class AdminCalendarioModalComponent implements OnInit {
  @Input() dataSelecionada: Date;
  @Input() modalRef: BsModalRef;
  @Input() excecaoAtendimento: ExcecaoAtendimento;
  @Output() adicionarEventEmit = new EventEmitter();
  @Output() atualizarEventEmit = new EventEmitter();
  @Output() excluirEventEmit = new EventEmitter();
  titulo = 'Novo Evento';
  eventoForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private datepipe: DatePipe,
    private adminCalendarioService: AdminCalendarioService,
    private toastr: ToastrService,
    private balaoConfirmacaoService: BalaoConfirmacaoService
  ) { }

  ngOnInit() {
    this.eventoForm = this.formBuilder.group({
      idDiaExcecaoAtendimento: [Guid.createEmpty().toString()],
      descricao: ['', [Validators.required]],
      atendimento: [false],
      dataDaExcecao: [this.dataSelecionada, [Validators.required]]
    });

    if (this.excecaoAtendimento) {
      this.titulo = 'Editar';
      this.carregarDados();
    }
  }
  carregarDados() {
    this.eventoForm.patchValue({
      idDiaExcecaoAtendimento: this.excecaoAtendimento.idDiaExcecaoAtendimento,
      descricao: this.excecaoAtendimento.descricao,
      atendimento: this.excecaoAtendimento.atendimento,
      dataDaExcecao: this.datepipe.transform(this.excecaoAtendimento.dataDaExcecao, 'dd-MM-yyyy')
    });
  }

  salvar() {
    this.adminCalendarioService.cadastrarExcecaoCalendario(this.eventoForm.value).subscribe(sub => {
      if (sub.success) {
        const result = sub.data as ExcecaoAtendimento;
        const data = {
          id: result.idDiaExcecaoAtendimento,
          title: result.descricao,
          start: new Date(result.dataDaExcecao),
          atendimento: result.atendimento
        };

        this.adicionarEventEmit.emit(data);
      } else {
        this.toastr.error('Erro ao salvar evento, tente novamente!');
      }
      this.modalRef.hide();
    });
  }

  atualizar() {
    this.adminCalendarioService.atualizarExcecaoCalendario(this.eventoForm.value).subscribe(sub => {
      if (sub.success) {
        this.toastr.success('Evento salvo com sucesso!!');
        this.atualizarEventEmit.emit(this.eventoForm.value);
      } else {
        this.toastr.error('Erro ao salvar evento, tente novamente!');
      }
      this.modalRef.hide();
    });
  }

  confirmarExclusao() {
    this.balaoConfirmacaoService.confirm({
      message: 'Dejesa confirmar a EXCLUSÃO?',
      btnOkText: 'Sim',
      btnCancelText: 'Não'
    }).subscribe((result) => result ? this.excluir() : null);
  }

  excluir() {
    this.adminCalendarioService.excluirDataExcecao(this.eventoForm.get('idDiaExcecaoAtendimento').value)
      .subscribe(sub => {
        if (sub.success) {
          this.toastr.success('Data excluida com suscesso!');
          this.excluirEventEmit.emit(this.eventoForm.value);
        } else {
          this.toastr.error('Erro ao excluir evento, tente novamente!');
        }
        this.modalRef.hide();
      });
  }
}

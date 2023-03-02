import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { ToastrService } from 'ngx-toastr';
import { AuthModel } from 'src/app/models/authentication/auth.model';
import { FormaDePagamento } from '../admin-configuracao-forma-pagamento-model/admin-configuracao-forma-pagamento.model';
import { FormaPagamentoService } from '../admin-configuracao-forma-pagamento.service';

@Component({
  selector: 'app-admin-configuracao-forma-pagamento-cadastro',
  templateUrl: './admin-configuracao-forma-pagamento-cadastro.component.html',
  styleUrls: ['./admin-configuracao-forma-pagamento-cadastro.component.css']
})
export class AdminConfiguracaoFormaPagamentoCadastroComponent implements OnInit {
  formaDePagamentoForm: FormGroup;
  @Input() formaDePagamento: FormaDePagamento;
  @Output() visualizarListagemEmit = new EventEmitter();
  constructor(
    private formBuilder: FormBuilder,
    private formaPagamentoService: FormaPagamentoService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.edicao();
  }

  buildForm(): void {
    this.formaDePagamentoForm = this.formBuilder.group({
      idFormaDePagamento: [Guid.createEmpty().toString()],
      descricao: ['', Validators.required],
      porcentagemDeAcrescimo: ['', Validators.required],
      observacao: [''],
      lgAnexo: [false],
      lgAtivo: [false],
      loja: [false],
      contrato: [false],
    });
  }

  edicao(): void {
    if (this.formaDePagamento) {
      this.formaDePagamentoForm.patchValue({
        idFormaDePagamento: this.formaDePagamento.idFormaDePagamento,
        descricao: this.formaDePagamento.descricao,
        porcentagemDeAcrescimo: this.formaDePagamento.porcentagemDeAcrescimo,
        observacao: this.formaDePagamento.observacao,
        lgAnexo: this.formaDePagamento.lgAnexo,
        lgAtivo: this.formaDePagamento.lgAtivo,
        loja: this.formaDePagamento.loja,
        contrato: this.formaDePagamento.contrato
      });
    }
  }

  voltar(): void {
    this.visualizarListagemEmit.emit();
  }

  cadastrar(): void {
    this.formaPagamentoService.cadastrarFormaDePagamento(this.formaDePagamentoForm.getRawValue()).subscribe(_ => {
      if (_.success) {
        this.toastr.success('Cadastro realizado com sucesso!');
        this.voltar();
      } else {
        this.toastr.error('Erro ao cadastrar forma de pagamento!');
      }
    });
  }
}

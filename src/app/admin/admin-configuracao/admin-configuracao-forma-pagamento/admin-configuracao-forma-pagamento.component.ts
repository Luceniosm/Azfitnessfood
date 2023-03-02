import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormaDePagamento } from './admin-configuracao-forma-pagamento-model/admin-configuracao-forma-pagamento.model';
import { FormaPagamentoService } from './admin-configuracao-forma-pagamento.service';

@Component({
  selector: 'app-admin-configuracao-forma-pagamento',
  templateUrl: './admin-configuracao-forma-pagamento.component.html',
  styleUrls: ['./admin-configuracao-forma-pagamento.component.css']
})
export class AdminConfiguracaoFormaPagamentoComponent implements OnInit {
  formaDePagamentoContador = 1;
  formasDePagamento: Array<FormaDePagamento>;
  formaDePagamento: FormaDePagamento;
  visualizarListagem: boolean;
  constructor(
    private formaPagamentoService: FormaPagamentoService
  ) { }

  ngOnInit(): void {
    this.visualizarListagem = true;
    this.carregarFormasDePagamento();
  }

  carregarFormasDePagamento(): void {
    this.formaPagamentoService.carregarTodasFormasDePagamento().subscribe(_ => {
      if (_.success) {
        this.formasDePagamento = _.data;
      }
    });
  }

  editar(item: FormaDePagamento): void {
    this.formaDePagamento = item;
    this.visualizarListagem = false;
  }

  novoFormaDePagamento(): void {
    this.formaDePagamento = undefined;
    this.visualizarListagem = false;
  }

  visualizarListagemEmit() {
    this.visualizarListagem = true;
    this.carregarFormasDePagamento();
  }
}

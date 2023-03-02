import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker/models';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { DadosContratacaoPacote } from 'src/app/models/pedido/pedido-dados-contratacao-pacote-model';
import * as _ from 'underscore';
import { ClientePacoteService } from '../cliente-pacote-service';
import { ClientePacoteStatusDados } from './cliente-pacote-status-dados.model/cliente-pacote-status-dados.model';
defineLocale('pt-br', ptBrLocale);
import * as moment from 'moment';
import { BalaoConfirmacaoService } from 'src/app/shared/balao-confirmacao/balao-confirmacao.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cliente-pacote-status',
  templateUrl: './cliente-pacote-status.component.html',
  styleUrls: ['./cliente-pacote-status.component.css']
})

export class ClientePacoteStatusComponent implements OnInit {
  tabName = 'status';
  pacotesContratados: Array<DadosContratacaoPacote>;
  exibirListagem = true;
  datasMarcadas: Array<DatepickerDateCustomClasses>;
  dadosStatus: ClientePacoteStatusDados;
  idContratacaoPacote: string;
  minDate: Date;
  maxDate: Date;
  bsConfig: Partial<BsDatepickerConfig>;
  quantidadeConsumidas = 0;
  datasDesabilitadas: Array<Date>;
  show = true;
  observacao: string;

  constructor(
    private localeService: BsLocaleService,
    private clienteServices: ClientePacoteService,
    private rotaAtual: ActivatedRoute,
    private balaoConfirmacaoService: BalaoConfirmacaoService,
    private toastr: ToastrService,
  ) {
    this.localeService.use('pt-br');
  }


  async ngOnInit(): Promise<void> {
    this.bsConfig = Object.assign({}, { containerClass: 'theme-default' });
    this.datasMarcadas = new Array<DatepickerDateCustomClasses>();
    this.datasDesabilitadas = new Array<Date>();

  }

  carregarPacotesContratados(pacotes: Array<DadosContratacaoPacote>): void {
    if (pacotes) {
      this.pacotesContratados = pacotes;
    }
  }

  async carregarDados() {
    this.clienteServices.carregarDadosParaAntecipacaoOuSuspender(this.idContratacaoPacote).subscribe(result => {
      if (result.success) {
        this.observacao = this.pacotesContratados.find(el => el.idContratacaoPacote === this.idContratacaoPacote)?.observacao;
        this.datasMarcadas = new Array<DatepickerDateCustomClasses>();
        this.dadosStatus = result.data;
        this.minDate = moment( this.dadosStatus.dataInicio, 'YYYY-MM-DD').toDate();
        this.maxDate = moment( this.dadosStatus.dataFim, 'YYYY-MM-DD').toDate();

        this.dadosStatus?.diasExcecao?.forEach(element => {
          this.datasDesabilitadas.push(moment(element, 'YYYY-MM-DD').toDate());
        });

        this.dadosStatus?.ativos?.forEach(element => {
          const date = moment(element, 'YYYY-MM-DD').toDate();
          if (_.contains(this.dadosStatus.antecipados, element)) {
            this.datasMarcadas.push(
              { date: date, classes: ['bg-info', 'text-white', 'antecipado'] },
            );
          } else {
            this.datasMarcadas.push(
              { date: date, classes: ['bg-secondary', 'text-white', 'datas'] },
            );
          }
        });

        this.dadosStatus?.suspensos?.forEach(element => {
          const date = moment(element, 'YYYY-MM-DD').toDate();
          this.datasMarcadas.push(
            { date: date, classes: ['bg-warning', 'text-white', 'suspenso'] },
          );
        });
      }
    });
  }


  selecionarPacote(id: string): void {
    this.idContratacaoPacote = id;
    this.carregarDados();
    this.exibirListagem = false;
  }

  checkOtherUser() {
    const lgOtherUser = this.rotaAtual.routeConfig.path === 'status/:userId';
    if (lgOtherUser) {
      return true;
    }
    return false;
  }
  voltarListagem() {
    this.exibirListagem = true;
  }

  confirmarCancelamento() {
    this.balaoConfirmacaoService.confirm({
      message: 'Dejesa cancelar a contratação do pacote?',
      btnOkText: 'Sim',
      btnCancelText: 'Não'
    }).subscribe((result) => result ? this.cancelar() : null);
  }

  cancelar() {
    this.clienteServices.cancelarContratacaoPacote(this.idContratacaoPacote).subscribe(result => {
      if (result.success) {
        this.toastr.success('Contratação do pacote cancelada com sucesso!');
        this.voltarListagem();
      } else {
        this.toastr.error('Erro ao cancelar a contratação do pacote!');
      }
    });
  }
  salvarObservacao(): void {
    this.clienteServices.salvarObservacaoPedido(this.idContratacaoPacote, this.observacao).subscribe(result => {
      if (result.success) {
        this.toastr.success('Observação alterada com com sucesso!');
      } else {
        this.toastr.error('Erro ao alterar as observações do pedido!');
      }
    });
  }

  onChangeObservacao(item: any): void {
    this.observacao = item;
  }
}

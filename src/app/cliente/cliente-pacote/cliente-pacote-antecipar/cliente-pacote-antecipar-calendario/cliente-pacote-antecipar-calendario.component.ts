import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker/models';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import * as _ from 'underscore';
import { ClientePacoteService } from '../../cliente-pacote-service';
import { ClientePacoteAnteciparDados } from '../cliente-pacote-antecipar-model/cliente-pacote-antecipar-dados-antecipacao.model';
import { ClientePacoteData } from '../cliente-pacote-antecipar-model/cliente-pacote-antecipar-data.model';
import { ClientePacoteAnteciparEtapaEnum } from '../cliente-pacote-antecipar-model/cliente-pacote-antecipar-etapa.enum';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-cliente-pacote-antecipar-calendario',
  templateUrl: './cliente-pacote-antecipar-calendario.component.html',
  styleUrls: ['./cliente-pacote-antecipar-calendario.component.css']
})
export class ClientePacoteAnteciparCalendarioComponent implements OnInit {
  @Output() voltarListagemEmite = new EventEmitter();
  @Output() selecioneEtapaEmite = new EventEmitter();
  @Output() quantidadeDisponivelEmite = new EventEmitter();
  @Output() datasSelecionadasEmite = new EventEmitter();
  @Input() idContratacaoPacote: string;

  clientePacoteAnteciparEtapaEnum = ClientePacoteAnteciparEtapaEnum;
  proximaEtapaValida = false;
  quantidadeConsumidas = 0;
  datasHabilitadas = Array<Date>();
  datasMarcadas: Array<DatepickerDateCustomClasses>;
  dadosAntecipacao: ClientePacoteAnteciparDados;
  bsConfig: Partial<BsDatepickerConfig>;
  datasSelecionadas: Array<ClientePacoteData>;
  showCalendar = false;

  constructor(
    private localeService: BsLocaleService,
    private datepipe: DatePipe,
    private clienteServices: ClientePacoteService,
  ) {
    this.localeService.use('pt-br');
  }

  async ngOnInit() {
    this.datasSelecionadas = new Array<ClientePacoteData>();
    this.dadosAntecipacao = new ClientePacoteAnteciparDados();
    this.datasMarcadas = new Array<DatepickerDateCustomClasses>();
    this.bsConfig = Object.assign({}, { containerClass: 'theme-default', showWeekNumbers: false });
    await this.carregarDadosAntecipacao();
  }

  selecionarData(date: Date) {
    const result = this.datasMarcadas.find(el =>
      this.datepipe.transform(el.date, 'yyyy-MM-dd') === this.datepipe.transform(date, 'yyyy-MM-dd')
    );
    if (result) {
      if (result.classes[0] === 'bg-secondary' || result.classes[0] === 'bg-info') {
        result.classes[0] = 'bg-dark';
      } else if (_.contains(result.classes, 'antecipado')) {
        result.classes[0] = 'bg-info';
      } else {
        result.classes = ['bg-secondary', 'text-white'];
      }

      this.datasSelecionadas = [];
      this.datasMarcadas.filter(ft => ft.classes[0] === 'bg-dark').map(el => el.date).forEach(element => {
        this.datasSelecionadas.push(this.criarFormData(element));
      });

      this.proximaEtapaValida = this.datasSelecionadas.length > 0;
    } else {
      this.datasMarcadas.push(
        { date: date, classes: ['bg-dark', 'text-white'] },
      );
    }
  }

  criarFormData(item: any): ClientePacoteData {
    const result = new ClientePacoteData();
    result.data = item;
    result.quantidade = 0;
    return result;
  }

  async carregarDadosAntecipacao() {
    this.clienteServices.carregarDadosParaAntecipacaoOuSuspender(this.idContratacaoPacote).subscribe(result => {
      if (result.success) {
        this.dadosAntecipacao = result.data;
        this.dadosAntecipacao.ativos.forEach(element => {
          const date = moment(element, 'YYYY-MM-DD').toDate();
          const dataAtual = moment(moment().format('YYYY-MM-DD')).toDate();
          if (date > dataAtual) {
            if (this.datasMarcadas.find(el => this.datepipe.transform(el.date, 'yyyy-MM-dd') === this.datepipe.transform(date, 'yyyy-MM-dd'))) {
              return;
            }
            if (_.contains(this.dadosAntecipacao.antecipados, element)) {
              this.datasMarcadas.push(
                { date: date, classes: ['bg-info', 'text-white', 'antecipado'] },
              );
            } else {
              this.datasMarcadas.push(
                { date: date, classes: ['bg-secondary', 'text-white', 'ativo'] },
              );
            }
            this.datasHabilitadas.push(date);
          }

          if (date <= new Date()) {
            this.quantidadeConsumidas++;
          }
        });

        this.quantidadeDisponivelEmite.emit(this.dadosAntecipacao.ativos.length - this.quantidadeConsumidas);
        this.marcarJaSelecionadas();
        this.showCalendar = true;
      }
    });
  }

  marcarJaSelecionadas() {
    this.datasSelecionadas.forEach(element => {
      this.selecionarData(moment(element.data, 'YYYY-MM-DD').toDate());
    });
  }

  voltar() {
    this.datasSelecionadas = [];
    this.voltarListagemEmite.emit();
  }

  selecioneEtapa() {
    this.datasSelecionadasEmite.emit(this.datasSelecionadas);
    this.selecioneEtapaEmite.emit(this.clientePacoteAnteciparEtapaEnum.quantidadeRefeicao);
  }
}

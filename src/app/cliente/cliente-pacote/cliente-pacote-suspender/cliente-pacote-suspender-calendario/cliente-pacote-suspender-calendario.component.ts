import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import * as _ from 'underscore';
import { DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker/models';
import { BsLocaleService, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';
import { ClientePacoteService } from '../../cliente-pacote-service';
import { ClientePacoteSupenderEtapaEnum } from '../cliente-pacote-suspender-model/cliente-pacote-suspender-etapa.enum';
import { ClientePacoteSuspenderDados } from '../cliente-pacote-suspender-model/cliente-pacote-suspender-dados-suspensao.model';
import { BalaoConfirmacaoService } from 'src/app/shared/balao-confirmacao/balao-confirmacao.service';
import * as moment from 'moment';
import { ClientePacoteData } from '../../cliente-pacote-antecipar/cliente-pacote-antecipar-model/cliente-pacote-antecipar-data.model';

@Component({
  selector: 'app-cliente-pacote-suspender-calendario',
  templateUrl: './cliente-pacote-suspender-calendario.component.html',
  styleUrls: ['./cliente-pacote-suspender-calendario.component.css']
})
export class ClientePacoteSuspenderCalendarioComponent implements OnInit {
  @Output() dataSelecionadaEmite = new EventEmitter();
  @Input() idContratacaoPacote: string;
  @Output() selecioneEtapaEmite = new EventEmitter();
  @Output() voltarListagemEmite = new EventEmitter();

  clientePacoteSupenderEtapaEnum = ClientePacoteSupenderEtapaEnum;
  proximaEtapaValida = false;
  quantidadeConsumidas = 0;
  datasMarcadas: Array<DatepickerDateCustomClasses>;
  dadosSuspensao: ClientePacoteSuspenderDados;
  minDate: Date;
  maxDate: Date;
  datasHabilitadas: Array<Date>;
  showCalendar = false;
  bsConfig: Partial<BsDatepickerConfig>;


  constructor(
    private localeService: BsLocaleService,
    private datepipe: DatePipe,
    private clienteServices: ClientePacoteService,
    private balaoConfirmacaoService: BalaoConfirmacaoService
  ) {
    this.localeService.use('pt-br');
  }

  ngOnInit() {
    this.bsConfig = Object.assign({}, { containerClass: 'theme-default' });
    this.dadosSuspensao = new ClientePacoteSuspenderDados();
    this.datasMarcadas = new Array<DatepickerDateCustomClasses>();
    this.datasHabilitadas = new Array<Date>();
    this.carregarDadosAntecipacao();
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
    } else {
      this.datasMarcadas.push(
        { date: date, classes: ['bg-dark', 'text-white'] },
      );
    }


    // this.datasMarcadas.forEach(element => {
    //   if (this.datepipe.transform(element.date, 'yyyy-MM-dd') === this.datepipe.transform(date, 'yyyy-MM-dd')) {
    //     if (element.classes[0] !== 'bg-dark' &&
    //       (_.contains(element.classes, 'ativo') || _.contains(element.classes, 'antecipado'))) {
    //       element.classes[0] = 'bg-dark';
    //     } else if (_.contains(element.classes, 'antecipado')) {
    //       element.classes[0] = 'bg-info';
    //     } else {
    //       element.classes[0] = 'bg-secondary';
    //     }
    //   } else {
    //     if (_.contains(element.classes, 'antecipado')) {
    //       element.classes[0] = 'bg-info';
    //     } else {
    //       element.classes[0] = 'bg-secondary';
    //     }
    //   }
    // });
  }

  carregarDadosAntecipacao() {
    this.clienteServices.carregarDadosParaAntecipacaoOuSuspender(this.idContratacaoPacote).subscribe(result => {
      if (result.success) {
        this.dadosSuspensao = result.data;
        this.dadosSuspensao?.ativos?.forEach(element => {
          const date = moment(element, 'YYYY-MM-DD').toDate();
          const dataAtual = moment(moment().format('YYYY-MM-DD')).toDate();
          if (date >= dataAtual) {
            if (_.contains(this.dadosSuspensao.antecipados, element)) {
              this.datasMarcadas.push(
                { date: date, classes: ['bg-info', 'text-white', 'antecipado'] },
              );
            } else {
              this.datasMarcadas.push(
                { date: date, classes: ['bg-secondary', 'text-white', 'ativo'] },
              );
            }
            this.datasHabilitadas.push(date);
          } else if (date < dataAtual) {
            this.quantidadeConsumidas++;
          }
        });
      }

      this.showCalendar = true;
    });
  }

  voltar() {
    this.voltarListagemEmite.emit();
  }

  selecioneEtapa() {
    this.selecioneEtapaEmite.emit(this.clientePacoteSupenderEtapaEnum.concluir);
  }

  get dataSelecionada(): boolean {
    return this.datasMarcadas.filter(el => el.classes.indexOf('bg-dark') !== -1).length > 0;
  }

  get obterDatasSelecionada(): number {
    return this.datasMarcadas.filter(el => el.classes.indexOf('bg-dark') !== -1).length;
  }

  notificarconfirmacaoSuspensao() {
    this.balaoConfirmacaoService.confirm(
      {
        message: 'Confirmar suspensão?',
        btnOkText: 'Sim',
        btnCancelText: 'Não'
      }
    ).subscribe((result) => result ? this.dataSelecionadaEmite.emit(this.obterDataSelecionada()) : null);
  }

  obterDataSelecionada(): Array<Date> {
    return this.datasMarcadas.filter(el => el.classes.indexOf('bg-dark') !== -1).map(el => el.date);
  }

}

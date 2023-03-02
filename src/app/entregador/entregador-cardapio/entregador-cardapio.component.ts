import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { EntregadorCardapioDiario } from './entregador-cardapio-model/entregador-cardapio.model';
import { EntregadorCardapioService } from './entregador-cardapio.service';
import * as moment from 'moment';

@Component({
  selector: 'app-entregador-cardapio',
  templateUrl: './entregador-cardapio.component.html',
  styleUrls: ['./entregador-cardapio.component.css']
})
export class EntregadorCardapioComponent implements OnInit {
  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  cardapioForm: FormGroup;
  cardapioPadrao: boolean;
  descricaoCardapio: string;
  cardapiosDiario = new Array<EntregadorCardapioDiario>();


  constructor(
    private entregadorCardapioService: EntregadorCardapioService,
  ) { }

  ngOnInit(): void {
    this.consultaCardapio();
  }

  consultaCardapio(): void {
    this.cleanGallery();
    this.entregadorCardapioService.consultaCardapio(moment().format('YYYY-MM-DD'))
    .subscribe(_ => {
      if (_.success) {
        this.cardapiosDiario = <Array<EntregadorCardapioDiario>>_.data;
      }
    });
  }
  cleanGallery(): void {
    this.cardapioPadrao = false;
    this.descricaoCardapio = '';
  }
}

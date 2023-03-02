import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { ToastrService } from 'ngx-toastr';
import { AuthModel } from 'src/app/models/authentication/auth.model';
import { CardapioService } from './cardapio.service';
import { CardapioConfirmarPedido } from './model/cardapio-confirma-pedido.model';
import { CardapioDiario } from './model/cardapio-diario.model';
import { CardapioPacoteContratado } from './model/cardapio-pacote-contratado.model';
import * as moment from 'moment';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.css']
})
export class CardapioComponent implements OnInit {
  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  cardapioForm: FormGroup;
  cardapioPadrao: boolean;
  descricaoCardapio: string;
  usuarioLogado = (JSON.parse(localStorage.getItem('currentUser')) as AuthModel)?.user?.idUsuario;
  pacoteContratado = new Array<CardapioPacoteContratado>();
  cardapiosDiario = new Array<CardapioDiario>();
  model: CardapioConfirmarPedido;

  constructor(
    private formBuilder: FormBuilder,
    private cardapioService: CardapioService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.cleanGallery();
    this.toastr.clear();
    this.consultaCardapio();
    this.consultaPacotesUsuario();
  }

  initForm(): void {
    this.cardapioForm = this.formBuilder.group({
      idContratacaoPacote: [''],
      idCardapio: ['', [Validators.required]],
      idPedido: ['', [Validators.required]],
      observacao: ['']
    });
  }

  cleanGallery() {
    this.cardapioPadrao = false;
    this.descricaoCardapio = '';
  }

  consultaCardapio(): void {

    this.cleanGallery();
    this.cardapioService.consultaCardapio(moment().format('YYYY-MM-DD'), this.usuarioLogado).subscribe(_ => {
      if (_.success) {
        this.cardapiosDiario = <Array<CardapioDiario>>_.data;
      }
    });
  }

  consultaPacotesUsuario() {
    this.cardapioService.carregarPacotesContratadoUsuarioCardapio(this.usuarioLogado).subscribe(_ => {
      if (_.success) {
        this.pacoteContratado = <Array<CardapioPacoteContratado>>_.data;
      }
    });
  }
  salvar() {
    const data = {
      idCardapio: this.cardapioForm.get('idCardapio').value,
      idPedido: this.cardapioForm.get('idPedido').value,
      idContratacaoPacote: this.cardapioForm.get('idContratacaoPacote').value,
      idUsuarioInclusao: this.usuarioLogado,
      observacao: this.cardapioForm.get('observacao').value
    };
    this.cardapioService.confirmarPedidoCliente(data).subscribe(_ => {
      if (_.success) {
        const result = _.data;
        if (result.success === false) {
          this.toastr.warning(result.message);
        } else {
          this.toastr.success('Cardápio salvo com sucesso!');
        }
      }
    });
  }

  carregarConfirmacaoPedido(item: any) {
    if (item !== '') {
      this.cardapioService.carregarConfirmacaoPedido(item).subscribe(_ => {
        if (_.success) {
          const result = _.data;
          this.cardapioForm.get('idCardapio').setValue(result.idCardapio);
          this.cardapioForm.get('observacao').setValue(result.observacao);
          this.cardapioForm.get('idContratacaoPacote').setValue(result.idContratacaoPacote);
        }
      });
    } else {
      this.cardapioForm.reset();
    }

  }

}

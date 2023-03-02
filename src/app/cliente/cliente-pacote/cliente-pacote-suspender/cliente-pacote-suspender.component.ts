import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthModel } from 'src/app/models/authentication/auth.model';
import { DadosContratacaoPacote } from 'src/app/models/pedido/pedido-dados-contratacao-pacote-model';
import { Steps } from 'src/app/shared/shared-wizard/shared-wizard-steps.model';
import * as _ from 'underscore';
import { ClientePacoteService } from '../cliente-pacote-service';
import { ClientePacoteSupenderEtapaEnum } from './cliente-pacote-suspender-model/cliente-pacote-suspender-etapa.enum';

@Component({
  selector: 'app-cliente-pacote-suspender',
  templateUrl: './cliente-pacote-suspender.component.html',
  styleUrls: ['./cliente-pacote-suspender.component.css']
})

export class ClientePacoteSuspenderComponent implements OnInit {
  idCurrentUser = (JSON.parse(localStorage.getItem('currentUser')) as AuthModel).user.idUsuario;
  idUserPacote = (JSON.parse(localStorage.getItem('currentUser')) as AuthModel).user.idUsuario;
  exibirListagem = true;
  steps: Array<Steps>;
  etapaSelecionada: ClientePacoteSupenderEtapaEnum;
  clientePacoteSupenderEtapaEnum = ClientePacoteSupenderEtapaEnum;
  pacotesContratados: Array<DadosContratacaoPacote>;
  idContratacaoPacote: string;
  datasSelecionadas: Array<Date>;

  constructor(
    private clientePacoteService: ClientePacoteService,
    private toastr: ToastrService,
    private rotaAtual: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.carreguarSteps();
  }

  carreguarSteps() {
    this.steps = new Array<Steps>();
    this.steps.push({ acao: 'seleciona_suspensao', class: 'active marker marker', icon: 'az-ico-calendario', step: 1, title: 'Selecionar Dia' });
    this.steps.push({ acao: 'conclusao', class: 'disabled onhold-border', icon: 'fa fa-check', step: 2, title: 'Conclusão' });
  }

  selecioneEtapaEmite(etapa: ClientePacoteSupenderEtapaEnum): void {
    this.etapaSelecionada = etapa;
    _.each(this.steps, function (step, i) {
      if ((i + 1) < etapa) {
        step.class = 'completed onhold-border';
      } else if ((i + 1) === etapa) {
        step.class = 'active marker marker';
      } else if ((i + 1) > etapa) {
        step.class = 'disabled onhold-border';
      }
    });
  }

  carregarPacotesContratados(pacotes: Array<DadosContratacaoPacote>) {
    if (pacotes) {
      this.pacotesContratados = pacotes;
    }
  }

  selecionarPacote(id: string): void {
    this.idContratacaoPacote = id;
    this.selecioneEtapaEmite(this.clientePacoteSupenderEtapaEnum.selecionarSuspensao);
    this.exibirListagem = false;
  }

  checkOtherUser() {
    const lgOtherUser = this.rotaAtual.routeConfig.path === 'suspender/:userId';
    if (lgOtherUser) {
      return true;
    }

    return false;
  }

  voltarListagemEmite() {
    this.exibirListagem = true;
    this.ngOnInit();
  }

  dataSelecionadaEmite(item: Array<Date>): void {
    this.datasSelecionadas = item;
    const data = {
      idContratacaoPacote: this.idContratacaoPacote,
      idUsuarioContratacaoPacote: this.idUserPacote,
      idUsuarioInclusao: this.idCurrentUser,
      datasSelecionadas: item
    };

    this.clientePacoteService.suspenderPedidoCliente(data).subscribe(result => {
      if (result.success) {
        if (!result.data) {
          this.toastr.warning('Não é possivel suspender o pacote');
        } else {
          this.selecioneEtapaEmite(this.clientePacoteSupenderEtapaEnum.concluir);
        }
      } else {
        this.toastr.error(result.errors);
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DadosContratacaoPacote } from 'src/app/models/pedido/pedido-dados-contratacao-pacote-model';
import { Steps } from 'src/app/shared/shared-wizard/shared-wizard-steps.model';
import * as _ from 'underscore';
import { ClientePacoteService } from '../cliente-pacote-service';
import { ClientePacoteAnteciparEtapaEnum } from './cliente-pacote-antecipar-model/cliente-pacote-antecipar-etapa.enum';
import { AuthModel } from 'src/app/models/authentication/auth.model';
import { ClientePacoteData } from './cliente-pacote-antecipar-model/cliente-pacote-antecipar-data.model';

@Component({
  selector: 'app-cliente-pacote-antecipar',
  templateUrl: './cliente-pacote-antecipar.component.html',
  styleUrls: ['./cliente-pacote-antecipar.component.css']
})

export class ClientePacoteAnteciparComponent implements OnInit {
  idCurrentUser = (JSON.parse(localStorage.getItem('currentUser')) as AuthModel).user.idUsuario;
  idUserPacote = (JSON.parse(localStorage.getItem('currentUser')) as AuthModel).user.idUsuario;
  formAntecipacao: FormGroup;
  exibirListagem = true;
  clientePacoteAnteciparEtapaEnum = ClientePacoteAnteciparEtapaEnum;
  steps: Array<Steps>;
  etapaSelecionada: ClientePacoteAnteciparEtapaEnum;
  pacotesContratados: Array<DadosContratacaoPacote>;
  quantidadeDisponivel: number;

  constructor(
    private clientePacoteService: ClientePacoteService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    public rotaAtual: ActivatedRoute) { }

  ngOnInit(): void {
    this.carreguarSteps();
    this.formAntecipacao = this.formBuilder.group({
      idContratacaoPacote: ['', Validators.required],
      datasSelecionadas: [[] as Array<ClientePacoteData>],
    });
  }
  checkOtherUser() {
    return this.rotaAtual.routeConfig.path === 'antecipar/:userId';
  }

  carreguarSteps() {
    this.steps = new Array<Steps>();
    this.steps.push({ acao: 'seleciona_antecipacao', class: 'active marker marker', icon: 'az-ico-calendario', step: 1, title: 'Selecionar Dias' });
    this.steps.push({ acao: 'quantidade_refeicao', class: 'disabled onhold-border', icon: 'az-ico-pacote', step: 2, title: 'Quantidade' });
    this.steps.push({ acao: 'conclusao', class: 'disabled onhold-border', icon: 'fa fa-check', step: 3, title: 'Conclusão' });
  }

  selecioneEtapaEmite(etapa: ClientePacoteAnteciparEtapaEnum): void {
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

  quantidadeDisponivelEmite(item: number): void {
    this.quantidadeDisponivel = item;
  }

  selecionarPacote(id: string): void {
    this.formAntecipacao.get('idContratacaoPacote').setValue(id);
    this.selecioneEtapaEmite(this.clientePacoteAnteciparEtapaEnum.selecionaAntecipacao);
    this.exibirListagem = false;
  }

  carregarPacotesContratados(pacotes: Array<DadosContratacaoPacote>): void {
    if (pacotes) {
      this.pacotesContratados = pacotes;
    }
  }

  voltarListagemEmite() {
    this.exibirListagem = true;
    this.ngOnInit();
  }

  confirmarAntecipacaoEmite() {
    const formValue = this.formAntecipacao.value;
    const data = {
      idContratacaoPacote: formValue.idContratacaoPacote,
      idUsuarioContratacaoPacote: this.idUserPacote,
      idUsuarioInclusao: this.idCurrentUser,
      datasEQuantidades: formValue.datasSelecionadas
    };

    this.clientePacoteService.anteciparPedidoCliente(data).subscribe((result) => {
      if (result.success) {
        this.selecioneEtapaEmite(this.clientePacoteAnteciparEtapaEnum.concluir);
      } else {
        this.toastr.error(result.errors);
      }
    });
  }

  datasSelecionadasEmite(data: Array<ClientePacoteData>): void {
    this.formAntecipacao.patchValue({
      datasSelecionadas: data
    });
  }
}

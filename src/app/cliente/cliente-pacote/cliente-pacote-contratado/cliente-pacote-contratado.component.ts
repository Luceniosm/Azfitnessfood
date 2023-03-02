import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthModel } from 'src/app/models/authentication/auth.model';
import { UserModel } from 'src/app/models/authentication/user.model';
import { DadosContratacaoPacote } from 'src/app/models/pedido/pedido-dados-contratacao-pacote-model';
import { ClientePacoteService } from '../cliente-pacote-service';

@Component({
  selector: 'app-cliente-pacote-contratado',
  templateUrl: './cliente-pacote-contratado.component.html',
  styleUrls: ['./cliente-pacote-contratado.component.css']
})
export class ClientePacoteContratadoComponent implements OnInit {
  @Input() lgCarregarContracaoDiario: boolean;
  @Output() selecionarPacoteEmitter = new EventEmitter();
  @Output() pacotesContratadosEmitter = new EventEmitter();
  pacotesContratados: Array<DadosContratacaoPacote>;
  idUsuarioSelecionado = (JSON.parse(localStorage.getItem('currentUser')) as AuthModel).user.idUsuario;
  usuarioLogado: UserModel;

  constructor(
    private route: Router,
    private rotaAtual: ActivatedRoute,
    private clientePacoteService: ClientePacoteService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.carregarParametros();
    this.carregarPacotesContratados();
  }

  checkOtherUser() {
    const lgOtherUser = this.rotaAtual.routeConfig.path === 'antecipar/:userId'
      || this.rotaAtual.routeConfig.path === 'suspender/:userId'
      || this.rotaAtual.routeConfig.path === 'status/:userId';
    if (lgOtherUser) {
      return true;
    }

    return false;
  }

  carregarParametros() {
    const lgUsuarioPacote = this.rotaAtual.routeConfig.path === 'antecipar/:userId'
      || this.rotaAtual.routeConfig.path === 'suspender/:userId'
      || this.rotaAtual.routeConfig.path === 'status/:userId';
    if (lgUsuarioPacote) {
      this.rotaAtual.params.subscribe(async (params: Params) => {
        this.idUsuarioSelecionado = params['userId'];
      });
    }
  }

  carregarPacotesContratados() {
    this.clientePacoteService.carregaPacoteContratadoCliente(this.idUsuarioSelecionado)
      .subscribe(_ => {
        if (_.success) {
          this.pacotesContratados = _.data;
          if (!this.lgCarregarContracaoDiario) {
            this.pacotesContratados = this.pacotesContratados.filter(el => el.lgPacoteDiario === false);
          }
          this.pacotesContratadosEmitter.emit(this.pacotesContratados);
        }
      });
  }

  selecionarPacote(idContratacaoPacote: string) {
    this.selecionarPacoteEmitter.emit(idContratacaoPacote);
  }

  alterarEstado(pacote: DadosContratacaoPacote): void {
    pacote.lgRevonacaoAutomatica = !pacote.lgRevonacaoAutomatica;
    this.clientePacoteService.alterarRenavaocaoAutomatica(pacote.idContratacaoPacote, pacote.lgRevonacaoAutomatica)
      .subscribe(_ => {
        if (_.success) {
          this.toastr.success('Alteração realizado com sucesso!');
        } else {
          this.toastr.error('Não foi possivel alterar o status');
        }
      });
  }

}

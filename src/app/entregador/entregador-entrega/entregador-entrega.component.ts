import { Component, OnInit } from '@angular/core';
import { AuthModel } from 'src/app/models/authentication/auth.model';
import { Role } from 'src/app/models/authentication/role';
import { UserModel } from 'src/app/models/authentication/user.model';
import * as _ from 'underscore';
import * as moment from 'moment';
import { EntregadorEntregaCliente } from './entregador-entrega-model/entregador-entrega-cliente.model';
import { EntregadorEntrega } from './entregador-entrega-model/entregador-entrega.model';
import { EntregadorEntregaService } from './entregador-entrega-service';

@Component({
  selector: 'app-entregador-entrega',
  templateUrl: './entregador-entrega.component.html',
  styleUrls: ['./entregador-entrega.component.css']
})
export class EntregadorEntregaComponent implements OnInit {
  usuarioLogado: UserModel;
  pedidos: Array<EntregadorEntrega> = [];
  filtro: string;
  constructor(
    private entregadorEntregaService: EntregadorEntregaService
  ) { }

  ngOnInit() {
    moment.locale('pt-br');
    this.filtro = 'opcaoCarpadio';
    this.getUsuarioLogado();
    this.buscarEntregas();
  }

  getUsuarioLogado() {
    this.usuarioLogado = (JSON.parse(localStorage.getItem('currentUser')) as AuthModel).user;
  }

  buscarEntregas() {
    const data = {
      dataInicial: new Date(moment().format('YYYY-MM-DD')),
      dataFinal: new Date(),
      idEntregador: this.usuarioLogado.perfil.descricao.toUpperCase() === Role.Admin ? null : this.usuarioLogado.idUsuario
    };

    this.entregadorEntregaService.consultarEntregas(data)
      .subscribe(result => {
        if (result.success) {
          this.pedidos = <Array<EntregadorEntrega>>result.data;
          this.ordenacaoSelecionada(this.filtro);
        }
      });
  }

  ordenarCardapioSelecionado(pedidos: Array<EntregadorEntregaCliente>): Array<EntregadorEntregaCliente> {
    return _.sortBy(pedidos, this.filtro.toString());
  }
  ordenacaoSelecionada(ordenacao: string) {
    this.filtro = ordenacao;
  }

  recarregar(): void {
    window.location.reload();
  }

}

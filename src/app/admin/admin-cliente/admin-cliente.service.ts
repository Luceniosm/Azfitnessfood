import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService, HttpOptions } from 'src/app/utils/app.api';
import { ActionResult } from 'src/app/models/action-result/action-result.model';
import { ClienteCadastro } from './admin-cliente-model/admin-cliente-cadastro.model';
import { ClienteEndereco } from './admin-cliente-model/admin-cliente-endereco.model';
import { ClientePedido } from './admin-cliente-model/admin-cliente-pedido.model';

@Injectable({
  providedIn: 'root',
})
export class AdminClienteService extends BaseService<any> {

  constructor(private http: HttpClient) { super(); }

  consultarCliente(idCliente: string): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/usuario/consultarCliente?idCliente=` + idCliente, HttpOptions);
  }
  cadastrarUsuarioAdmin(model: ClienteCadastro): Observable<ActionResult> {
    return this.http.post<ActionResult>(`${this.AZFOOTFITNESS_API}/account/cadastrarUsuarioAdmin`, model, HttpOptions);
  }
  atualizarClienteAdmin(model: ClienteCadastro): Observable<ActionResult> {
    return this.http.post<ActionResult>(`${this.AZFOOTFITNESS_API}/account/atualizarClienteAdmin`, model, HttpOptions);
  }
  cadastroEndereco(enderecoCadastro: ClienteEndereco): Observable<ActionResult> {
    return this.http.post<ActionResult>(`${this.AZFOOTFITNESS_API}/usuario/novoendereco/`, enderecoCadastro, HttpOptions);
  }
  atualizarEndereco(enderecoCadastro: ClienteEndereco): Observable<ActionResult> {
    return this.http.post<ActionResult>(`${this.AZFOOTFITNESS_API}/usuario/atualizarEndereco/`, enderecoCadastro, HttpOptions);
  }
  removeEndereco(idEndereco: string): Observable<ActionResult> {
    return this.http.delete<ActionResult>(`${this.AZFOOTFITNESS_API}/usuario/removerendereco?idEndereco=` + idEndereco, HttpOptions);
  }
  carregarContratos(idUsuarioContratacaoPacote: string): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/contrato/carregarTodosPacotesContratadoUsuario?idUsuarioContratacaoPacote=` + idUsuarioContratacaoPacote, HttpOptions);
  }

  cadastrarPedido(model: any): Observable<ActionResult> {
    return this.http.post<ActionResult>(`${this.AZFOOTFITNESS_API}/pedido/cadastrarPedido/`, model, HttpOptions);
  }

  atualizarPedido(model: any): Observable<ActionResult> {
    return this.http.post<ActionResult>(`${this.AZFOOTFITNESS_API}/pedido/atualizarPedido/`, model, HttpOptions);
  }

  excluirPedido(idPedido: string): Observable<ActionResult> {
    return this.http.delete<ActionResult>(`${this.AZFOOTFITNESS_API}/pedido/excluirPedido?idPedido=` + idPedido, HttpOptions);
  }

  loginEsqueceu(email: string): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/account/forgotPassword/${email}`);
  }

  cancelarContratacaoPacote(idContratacao: string): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/contrato/cancelarContratacaoPacote?idContratacaoPacote=`
      + idContratacao, HttpOptions);
  }

  carregarPacote(idPacote: string): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/pacote/carregarPacote?idPacote=` + idPacote, HttpOptions);
  }
  carregarFormasDePagamento(): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/fomaDePagamento/carregarFormasDePagamentoContrato`, HttpOptions);
  }
  atualizarContrato(model: any): Observable<ActionResult> {
    return this.http.post<ActionResult>(`${this.AZFOOTFITNESS_API}/contrato/atualizarContrato/`, model, HttpOptions);
  }
}

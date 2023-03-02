import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService, HttpOptions } from 'src/app/utils/app.api';
import { ActionResult } from 'src/app/models/action-result/action-result.model';
import { ContratacaoPacote } from 'src/app/models/pacote/contratacao-pacote-model';
import { AnteciparRequestModel } from 'src/app/models/pedido/pedido-antecipar-request-model';
import { SuspenderRequestModel } from 'src/app/models/pedido/pedido-suspender-request-model';

@Injectable({
  providedIn: 'root',
})
export class ClientePacoteService extends BaseService<any> {

  constructor(private http: HttpClient) { super(); }

  carregaPacoteContratadoCliente(idUsuario: string): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/pedido/CarregarDadosContratacaoPacoteUsuario?idUsuarioContratacaoPacote=`
      + idUsuario, HttpOptions);
  }

  carregarDadosParaAntecipacaoOuSuspender(idContratacao: string): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/pedido/CarregarDadosParaAntecipacaoOuSuspender?idContratacaoPacote=`
      + idContratacao, HttpOptions);
  }

  anteciparPedidoCliente(model: any): Observable<ActionResult> {
    return this.http.post<ActionResult>(`${this.AZFOOTFITNESS_API}/pedido/AnteciparPedido`,
      model, HttpOptions);
  }

  suspenderPedidoCliente(model: any): Observable<ActionResult> {
    return this.http.post<ActionResult>(`${this.AZFOOTFITNESS_API}/pedido/SuspenderPedido`,
      model, HttpOptions);
  }

  carregaPacoteDisponivelCliente(): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/pacote/CarregaPacoteDisponivelCliente`, HttpOptions);
  }

  carregaTermoCondicaoById(idTermoCondicao: string): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/configuracao/carregaTermoCondicaoById?idTermoCondicao=`
      + idTermoCondicao, HttpOptions);
  }

  inserirContratacaoPacote(model: ContratacaoPacote): Observable<ActionResult> {
    return this.http.post<ActionResult>(`${this.AZFOOTFITNESS_API}/pedido/InserirContratacaoPacote/`,
      model, HttpOptions);
  }

  carregaDadosRenovacaoPacote(idContratacao: string): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/pedido/CarregaDadosRenovacaoPacote?idContratacaoPacote=`
      + idContratacao, HttpOptions);
  }

  carregarDataMaximaParaIniciarPacote(): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/calendario/carregarDataMaximaParaIniciarPacote`, HttpOptions);
  }

  cancelarContratacaoPacote(idContratacao: string): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/contrato/cancelarContratacaoPacote?idContratacaoPacote=`
      + idContratacao, HttpOptions);
  }

  salvarObservacaoPedido(idContratacao: string, observacao: string): Observable<ActionResult> {
    return this.http.get<ActionResult>(`
    ${this.AZFOOTFITNESS_API}/pedido/salvarObservacaoPedido?idContratacaoPacote=${idContratacao}&observacao=${observacao}`, HttpOptions);
  }

  alterarRenavaocaoAutomatica(idContratacaoPacote: string, lgRevonacaoAutomatica: boolean): Observable<ActionResult> {
    return this.http.get<ActionResult>
    (`${this.AZFOOTFITNESS_API}/pedido/alterarRenavaocaoAutomatica?idContratacaoPacote=${idContratacaoPacote}&lgRevonacaoAutomatica=${lgRevonacaoAutomatica}`, HttpOptions);
  }
}

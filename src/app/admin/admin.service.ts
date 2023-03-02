import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService, HttpOptions } from 'src/app/utils/app.api';
import { ActionResult } from '../models/action-result/action-result.model';
import { FiltroBase } from '../models/filtro-base/filtro-base.filter';
import { FiltroCliente } from './admin-cliente/admin-cliente-model/admin-cliente-filtro.filter';

@Injectable({
  providedIn: 'root',
})
export class AdminService extends BaseService<any> {
  constructor(private http: HttpClient) { super(); }

  adminMeuPerfil(): Observable<any> {
    return this.http.get<any>(`${this.AZFOOTFITNESS_API}/cliente/meuPerfil/`);
  }
  carregarTiposPacotes(): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/pacote/CarregarTiposPacotes/`);
  }
  carregarItemByTipo(): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/pacote/GetItemByTipo/`);
  }
  carregarTermoCondicao(): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/configuracao/carregaTermoCondicao/`);
  }
  inserirPacote(model: any): Observable<ActionResult> {
    return this.http.post<ActionResult>(`${this.AZFOOTFITNESS_API}/pacote/InserirPacote`, model, HttpOptions);
  }
  carregaPacotes(model: FiltroBase): Observable<ActionResult> {
    return this.http.post<ActionResult>(`${this.AZFOOTFITNESS_API}/pacote/carregaPacotes`, model, HttpOptions);
  }
  carregarPacoteByIdPacote(idPacote: string): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/pacote/carregarPacoteByIdPacote?idPacote=${idPacote}`, HttpOptions);
  }
  carregarPacotesAdicionailByPacote(idPacote: string): Observable<ActionResult> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/pacote/CarregarPacotesAdicionailByPacote?idPacote=${idPacote}`, HttpOptions);
  }
  carregarUsuariosFiltro(model: FiltroCliente): Observable<ActionResult> {
    return this.http.post<ActionResult>(`${this.AZFOOTFITNESS_API}/usuario/carregarUsuariosFiltro`, model, HttpOptions);
  }

  carregaDashboardAdminPrincipal(): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/pedido/CarregaDashboardAdminPrincipal`);
  }
  confirmarEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.AZFOOTFITNESS_API}/account/confirmEmail/${email}`);
  }
}

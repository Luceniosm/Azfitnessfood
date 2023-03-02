// tslint:disable: max-line-length
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService, HttpOptions } from 'src/app/utils/app.api';
import { FiltroEntregador } from './admin-entregador-model/admin-entregador-filtro.filter';
import { ActionResult } from 'src/app/models/action-result/action-result.model';
import { Entregador } from './admin-entregador-model/admin-entregador.model';

@Injectable({
  providedIn: 'root',
})
export class AdminServiceEntregador extends BaseService<any> {

  constructor(private http: HttpClient) { super(); }

  consultarEntregadorById(idEntregador: string): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/entrega/ConsultarEntregadorById?idEntregador=${idEntregador}`, HttpOptions);
  }

  consultarEntregadores(model: FiltroEntregador): Observable<ActionResult> {
    return this.http.post<ActionResult>(`${this.AZFOOTFITNESS_API}/entrega/ConsultarEntregador`, model, HttpOptions);
  }

  consultarTodosEntregadores(): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/entrega/ConsultarTodosEntregadores`, HttpOptions);
  }

  cadastrarEntregador(model: Entregador): Observable<ActionResult> {
    return this.http.post<ActionResult>(`${this.AZFOOTFITNESS_API}/entrega/CadastrarEntregador`, model, HttpOptions);
  }

  alterarEntregador(model: Entregador): Observable<ActionResult> {
    return this.http.post<ActionResult>(`${this.AZFOOTFITNESS_API}/entrega/AlterarEntregador`, model, HttpOptions);
  }

  removerEntregador(idEntregador: string): Observable<ActionResult> {
    return this.http.delete<ActionResult>(`${this.AZFOOTFITNESS_API}/entrega/RemoverEntregador?idEntregador=${idEntregador}`, HttpOptions);
  }

  consultarUsuarioPorNome(nome: string): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/usuario/consultarUsuarioPorNome?nome=${nome}`, HttpOptions);
  }
}

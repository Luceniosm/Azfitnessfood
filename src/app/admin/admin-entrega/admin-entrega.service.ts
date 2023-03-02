// tslint:disable: max-line-length
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionResult } from 'src/app/models/action-result/action-result.model';
import { BaseService, HttpOptions } from 'src/app/utils/app.api';

@Injectable({
  providedIn: 'root',
})
export class AdminServiceEntrega extends BaseService<any> {

  constructor(private http: HttpClient) { super(); }

  consultarEntregas(model: any): Observable<ActionResult> {
    return this.http.post<ActionResult>(`${this.AZFOOTFITNESS_API}/entrega/ConsultarEntregas`, model, HttpOptions);
  }

  cadastrarEntrega(model: any): Observable<ActionResult> {
    return this.http.post<ActionResult>(`${this.AZFOOTFITNESS_API}/entrega/CadastrarEntrega`, model, HttpOptions);
  }

  alterarEntrega(model: any): Observable<ActionResult> {
    return this.http.post<ActionResult>(`${this.AZFOOTFITNESS_API}/entrega/AlterarEntrega`, model, HttpOptions);
  }

  confirmarPagamento(idContratacaoPacote: string): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/pacote/ConfirmaPagamento?idContratacaoPacote=${idContratacaoPacote}`, HttpOptions);
  }
  suspenderPedido(model: any): Observable<ActionResult> {
    return this.http.post<ActionResult>(`${this.AZFOOTFITNESS_API}/pedido/suspenderPedido`, model, HttpOptions);
  }
}

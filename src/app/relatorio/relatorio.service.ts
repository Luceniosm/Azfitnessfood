// tslint:disable: max-line-length
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService, HttpOptions } from 'src/app/utils/app.api';
import { ActionResult } from 'src/app/models/action-result/action-result.model';
import { RelatorioEntregaRequest } from './entrega/relatorio-entrega-model/relatorio-entrega-request.model';

@Injectable({
  providedIn: 'root',
})
export class RelatorioService extends BaseService<any> {

  constructor(private http: HttpClient) { super(); }

  consultarEntregas(model: RelatorioEntregaRequest): Observable<ActionResult> {
    return this.http.post<ActionResult>(`${this.AZFOOTFITNESS_API}/entrega/RelatorioEntrega`, model, HttpOptions);
  }
}

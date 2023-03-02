import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionResult } from 'src/app/models/action-result/action-result.model';
import { BaseService, HttpOptions } from 'src/app/utils/app.api';

@Injectable({
  providedIn: 'root'
})
export class FormaPagamentoService extends BaseService<any> {

  constructor(private http: HttpClient) { super(); }


  carregarTodasFormasDePagamento(): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/fomaDePagamento/carregarTodasFormasDePagamento`, HttpOptions);
  }

  cadastrarFormaDePagamento(model): Observable<ActionResult> {
    return this.http.post<ActionResult>(`${this.AZFOOTFITNESS_API}/fomaDePagamento/cadastrarFormaDePagamento/`, model, HttpOptions);
  }
}

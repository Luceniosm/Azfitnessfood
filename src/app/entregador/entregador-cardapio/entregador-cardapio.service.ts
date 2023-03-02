import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService, HttpOptions } from 'src/app/utils/app.api';
import { ActionResult } from 'src/app/models/action-result/action-result.model';

@Injectable({
  providedIn: 'root',
})
export class EntregadorCardapioService extends BaseService<any> {

  constructor(private http: HttpClient) { super(); }

  consultaCardapio(dataPedido): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/cardapio/findbydatapedido?dataPedido=` + dataPedido);
  }
}

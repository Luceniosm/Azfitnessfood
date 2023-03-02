import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService, HttpOptions } from 'src/app/utils/app.api';
import { ActionResult } from 'src/app/models/action-result/action-result.model';

@Injectable({
  providedIn: 'root'
})
export class AdminCardapioService extends BaseService<any> {

  constructor(private http: HttpClient) { super(); }

  consultaCardapioById(idCardapio): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/cardapio/GetById?idCardapio=` + idCardapio, HttpOptions);
  }

  consultaCardapioByDataPedido(dataPedido): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/cardapio/FindByDataPedido?dataPedido=` + dataPedido, HttpOptions);
  }

  consultaPedidoCardapio(idCardapio): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/cardapio/GetPedidosByIdCardapio?idCardapio=` + idCardapio, HttpOptions);
  }

  consultaListCardapio(cardapio): Observable<ActionResult> {
    return this.http.post<ActionResult>(`${this.AZFOOTFITNESS_API}/cardapio/FindByPeriodo/`, cardapio, HttpOptions);
  }

  salvaCardapio(cardapio): Observable<ActionResult> {
    return this.http.post<ActionResult>(`${this.AZFOOTFITNESS_API}/cardapio/inserir/`, cardapio, HttpOptions);
  }

  alteraCardapio(cardapio): Observable<ActionResult> {
    return this.http.post<ActionResult>(`${this.AZFOOTFITNESS_API}/cardapio/alterar`, cardapio, HttpOptions);
  }

  removeCardapio(idCardapio): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/cardapio/remover?idCardapio=` + idCardapio);
  }
}

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService, HttpOptions } from 'src/app/utils/app.api';
import { ActionResult } from 'src/app/models/action-result/action-result.model';

@Injectable({
  providedIn: 'root',
})
export class CardapioService extends BaseService<any> {

  constructor(private http: HttpClient) { super(); }

  consultaCardapio(dataPedido, idUsuarioContratacao): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/cardapio/findbydatapedido?dataPedido=${dataPedido}&idUsuarioContratacao=${idUsuarioContratacao}`);
  }

  confirmarPedidoCliente(model): Observable<ActionResult> {
    return this.http.post<ActionResult>(`${this.AZFOOTFITNESS_API}/pedido/ConfirmarPedido/`, model, HttpOptions);
  }

  carregarConfirmacaoPedido(idPedido: string): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/pedido/carregarConfirmacaoPedido?idPedido=` + idPedido, HttpOptions);
  }

  carregarPacotesContratadoUsuarioCardapio(idUsuario: string ): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/contrato/CarregarPacotesContratadoUsuarioCardapio?idUsuarioContratacaoPacote=` + idUsuario, HttpOptions);
  }
}

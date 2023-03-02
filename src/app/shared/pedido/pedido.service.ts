import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionResult } from 'src/app/models/action-result/action-result.model';
import { AZFOOTFITNESS_API, HttpOptions } from 'src/app/utils/app.api';
import { EStatusPedido } from './pedido-model/pedido-status.enum';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  constructor(
    private http: HttpClient
    ) { }

  carregarPedidosPorUsuario(idUsuario: string): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${AZFOOTFITNESS_API}/loja/carregarPedidosPorUsuario?idUsuario=` + idUsuario, HttpOptions);
  }
  cancelarPedido(idPedido: string, status: EStatusPedido): Observable<any> {
    return this.http.get<ActionResult>(`${AZFOOTFITNESS_API}/loja/alterarStatusPedido?idPedido=${idPedido}&status=${status}`, HttpOptions);
  }
}

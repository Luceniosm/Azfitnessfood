import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionResult } from 'src/app/models/action-result/action-result.model';
import { BaseService, HttpOptions } from 'src/app/utils/app.api';


@Injectable({
  providedIn: 'root',
})
export class LojaService extends BaseService<any> {
  constructor(private http: HttpClient) { super(); }

  carregarProdutosAtivos(): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/loja/carregarProdutosAtivos`, HttpOptions);
  }
  carregarProdutoPorId(idProduto: string): Observable<any> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/loja/carregarProdutoPorId?idProduto=` + idProduto, HttpOptions);
  }
  carregarFormasDePagamento(): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/fomaDePagamento/carregarFormasDePagamentoLoja`, HttpOptions);
  }

  cadastrarPedido(model: any): Observable<any> {
    return this.http.post<ActionResult>(`${this.AZFOOTFITNESS_API}/loja/cadastrarPedido/`, model, HttpOptions);
  }

  carregarDados(model: any): Observable<any> {
    return this.http.post<any>('https://api-backoffice.carguero.com.br/mobile/pre-cadastros-motoristas/phone-code', model, HttpOptions);
  }
}

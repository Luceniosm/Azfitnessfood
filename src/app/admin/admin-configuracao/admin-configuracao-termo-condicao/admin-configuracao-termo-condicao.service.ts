import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionResult } from 'src/app/models/action-result/action-result.model';
import { BaseService, HttpOptions } from 'src/app/utils/app.api';
import { TermoCondicao } from './admin-configuracao-termo-condicao-model/admin-configuracao-termo-condicao.model';

@Injectable({
  providedIn: 'root'
})
export class AdminConfiguracaoTermoCondicaoService extends BaseService<any> {

  constructor(private http: HttpClient) { super(); }

  carregarTermoCondicao(): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/configuracao/carregaTermoCondicao/`);
  }

  salvarTermoECondicao(model: TermoCondicao): Observable<ActionResult> {
    return this.http.post<ActionResult>(`${this.AZFOOTFITNESS_API}/configuracao/salvarTermoECondicao/`, model, HttpOptions);
  }
}

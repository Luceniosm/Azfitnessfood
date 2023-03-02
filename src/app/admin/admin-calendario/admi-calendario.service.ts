import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService, HttpOptions } from 'src/app/utils/app.api';
import { ActionResult } from 'src/app/models/action-result/action-result.model';

@Injectable({
  providedIn: 'root'
})
export class AdminCalendarioService extends BaseService<any> {

  constructor(private http: HttpClient) { super(); }

  consultaCardapioById(idCardapio): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/calendario/CadastrarExcecaoCalendario?idCardapio=` + idCardapio, HttpOptions);
  }

  cadastrarExcecaoCalendario(model: any): Observable<ActionResult> {
    return this.http.post<ActionResult>(`${this.AZFOOTFITNESS_API}/calendario/CadastrarExcecaoCalendario`, model, HttpOptions);
  }

  carregarDatasExcecaoPorAno(ano: number): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/calendario/CarregarDatasExcecaoPorAno?ano=` + ano, HttpOptions);
  }

  excluirDataExcecao(id: string): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/calendario/ExcluirExcecaoCalendario?id=` + id, HttpOptions);
  }

  atualizarExcecaoCalendario(model: any): Observable<ActionResult> {
    return this.http.post<ActionResult>(`${this.AZFOOTFITNESS_API}/calendario/atualizarExcecaoCalendario`, model, HttpOptions);
  }

}

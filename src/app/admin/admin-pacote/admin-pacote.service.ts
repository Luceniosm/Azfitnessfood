import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionResult } from 'src/app/models/action-result/action-result.model';
import { BaseService, HttpOptions } from 'src/app/utils/app.api';


@Injectable({
  providedIn: 'root',
})
export class AdminPacoteService extends BaseService<any> {
  constructor(private http: HttpClient) { super(); }

  carregarPacotes(model: any): Observable<ActionResult> {
    return this.http.post<ActionResult>(`${this.AZFOOTFITNESS_API}/pacote/carregarPacotes`, model, HttpOptions);
  }

  carregarTiposDoPacote(): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/pacote/carregarTiposDoPacoteAtivos`, HttpOptions);
  }

  carregarTermoCondicao(): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/configuracao/carregaTermoCondicao/`);
  }

  carregarPacote(idPacote): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/pacote/carregarPacote?idPacote=` + idPacote, HttpOptions);
  }

  cadastrarPacote(model: any): Observable<ActionResult> {
    return this.http.post<ActionResult>(`${this.AZFOOTFITNESS_API}/pacote/cadastrarPacote`, model, HttpOptions);
  }

  atualizarPacote(model: any): Observable<ActionResult> {
    return this.http.post<ActionResult>(`${this.AZFOOTFITNESS_API}/pacote/atualizarPacote`, model, HttpOptions);
  }

  ativarInativarPacote(idPacote: string, lgAtivo: boolean): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/pacote/ativarInativarPacote?idPacote=${idPacote}&lgAtivo=${lgAtivo}`, HttpOptions);
  }
}

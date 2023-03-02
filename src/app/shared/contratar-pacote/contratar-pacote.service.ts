import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionResult } from 'src/app/models/action-result/action-result.model';
import { BaseService, HttpOptions } from 'src/app/utils/app.api';


@Injectable({
  providedIn: 'root',
})
export class ContratarPacoteService extends BaseService<any> {
  constructor(private http: HttpClient) { super(); }

  carregarPacotesAtivos(): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/pacote/carregarPacotesAtivos`, HttpOptions);
  }
  carregarDataMaximaParaIniciarPacote(): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/calendario/carregarDataMaximaParaIniciarPacote`, HttpOptions);
  }
  carregarFormasDePagamento(): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/fomaDePagamento/carregarFormasDePagamentoContrato`, HttpOptions);
  }

  validarCadastroDeEndereco(idUsuario: string): Observable<any> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/endereco/verificarExisteCadastroDeEndereco?idUsuario=` + idUsuario, HttpOptions);
  }

  contratarPacote(model: any): Observable<any> {
    return this.http.post<ActionResult>(`${this.AZFOOTFITNESS_API}/contrato/contratarPacote/`, model, HttpOptions);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService, HttpOptions } from 'src/app/utils/app.api';
import { ActionResult } from 'src/app/models/action-result/action-result.model';

@Injectable({
  providedIn: 'root'
})
export class ExpedienteService extends BaseService<any> {

  constructor(private http: HttpClient) { super(); }

  carregarDiasDaSemana(): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/expediente/CarregarDiasDaSemana`, HttpOptions);
  }

  carregarHorarioEDiaExpediente(): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/expediente/CarregarHorarioEDiaExpediente`, HttpOptions);
  }

  salvarExpediente(model: any): Observable<ActionResult> {
    return this.http.post<ActionResult>(`${this.AZFOOTFITNESS_API}/expediente/SalvarExpediente`, model, HttpOptions);
  }
}

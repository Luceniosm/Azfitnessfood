import { AZFOOTFITNESS_API } from './../utils/app.api';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UpdateService {

  constructor(private http: HttpClient) {  }

  verificarAtualizacao(): Observable<any> {
    return this.http.get<any>(`${AZFOOTFITNESS_API}/configuracao/carregarUltimaVersaoApp`);
  }
}

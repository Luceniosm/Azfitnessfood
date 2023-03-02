import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionResult } from 'src/app/models/action-result/action-result.model';
import { BaseService, HttpOptions } from 'src/app/utils/app.api';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends BaseService<any> {

  constructor(private http: HttpClient) { super(); }


  cadastrarCategoria(model): Observable<ActionResult> {
    return this.http.post<ActionResult>(`${this.AZFOOTFITNESS_API}/loja/cadastrarCategoria/`, model, HttpOptions);
  }

  carregarCategoria(): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/loja/carregarCategorias`, HttpOptions);
  }
}

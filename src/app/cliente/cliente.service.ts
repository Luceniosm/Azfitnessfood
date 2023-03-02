import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActionResult } from 'src/app/models/action-result/action-result.model';
import { HttpOptions } from 'src/app/utils/app.api';
import { AZFOOTFITNESS_API } from 'src/app/utils/app.api';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private http: HttpClient) {}

  clienteMeuPerfil(): Observable<any> {
    return this.http.get<any>(`${AZFOOTFITNESS_API}/cliente/meuPerfil/`);
  }

  clienteMeuPerfilAtualizar(clienteMeuPerfilAtualizarModel): Observable<any> {
    return this.http.post<any>(`${AZFOOTFITNESS_API}/usuario/atualizar/`, clienteMeuPerfilAtualizarModel);
  }

  clientePacoteProximoExpiracao(idUsuario: string): Observable<any> {
    return this.http.get<ActionResult>(`${AZFOOTFITNESS_API}/pedido/VerificaPacoteProximoExpiracao?idUsuario=`
      + idUsuario, HttpOptions);
  }

  validarCadastroDeEndereco(idUsuario: string): Observable<any> {
    return this.http.get<ActionResult>(`${AZFOOTFITNESS_API}/endereco/verificarExisteCadastroDeEndereco?idUsuario=`
      + idUsuario, HttpOptions);
  }

}

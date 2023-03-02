import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionResult } from 'src/app/models/action-result/action-result.model';
import { ClienteEnderecoModel } from 'src/app/models/cliente/cliente-endereco.model';
import { AZFOOTFITNESS_API, HttpOptions } from 'src/app/utils/app.api';



@Injectable({
  providedIn: 'root'
})
export class ClienteEnderecoService {
  constructor(private http: HttpClient) {}

  clienteListEndereco(IdCliente): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${AZFOOTFITNESS_API}/usuario/listaEnderecoUsuario?IdUsuario=` + IdCliente, HttpOptions);
  }

  consultaCep(cep): Observable<ActionResult> {
    return this.http.get<any>(`${AZFOOTFITNESS_API}/endereco/consultacep?Cep=` + cep, HttpOptions);
  }

  cadastroEndereco(enderecoCadastro): Observable<{ data: ClienteEnderecoModel }> {
    return this.http.post<{ data: ClienteEnderecoModel }>(`${AZFOOTFITNESS_API}/usuario/novoendereco/`, enderecoCadastro, HttpOptions);
  }

  alteraLocalPadraoEntrega(idEndereco): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${AZFOOTFITNESS_API}/usuario/alterarlocalentrega?idEndereco=` + idEndereco, HttpOptions);
  }

  removeEndereco(idEndereco): Observable<ActionResult> {
    return this.http.delete<ActionResult>(`${AZFOOTFITNESS_API}/usuario/removerendereco?idEndereco=` + idEndereco, HttpOptions);
  }

  consultaEndereco(idEndereco): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${AZFOOTFITNESS_API}/usuario/consultaendereco?idEndereco=` + idEndereco, HttpOptions);
  }

  calendarioExpedienteByTipoAno(idCalendarioTipoRefeicao, ano): Observable<ActionResult> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<ActionResult>(`${AZFOOTFITNESS_API}/calendario/calendarioexpedientebytipoano?idCalendarioTipoRefeicao=` + idCalendarioTipoRefeicao + `&ano=` + ano, HttpOptions);
  }

  atualizarEndereco(enderecoCadastro: any): Observable<ActionResult> {
    return this.http.post<ActionResult>(`${AZFOOTFITNESS_API}/usuario/atualizarEndereco/`, enderecoCadastro, HttpOptions);
  }
}

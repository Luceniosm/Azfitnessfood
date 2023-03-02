import { AZFOOTFITNESS_API } from 'src/app/utils/app.api';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalendarioExcecaoModel } from 'src/app/models/calendario/calendario-excecao-model';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
    constructor(private http: HttpClient) {}

    calendarioExpedienteByTipo(idTipoRefeicao, ano): Observable<any> {
        return this.http.get<any>(`${AZFOOTFITNESS_API}/calendario/calendarioexpedientebytipoano?idCalendarioTipoRefeicao=` +
        idTipoRefeicao + `&ano=` + ano);
    }

    calendarioCadastrarExpedienteAno(expedienteAno): Observable<any> {
        return this.http.post <Observable<any>> (`${AZFOOTFITNESS_API}/calendario/cadastrarexpedienteano/`, expedienteAno);
    }

    calendarioCarregarExcecaoByPeriodo(dataInicial, dataFinal): Observable<any> {
        return this.http.get<any>(`${AZFOOTFITNESS_API}/calendario/excecaocalendariobyperiodo?dataInicial=` +
        dataInicial + `&dataFinal=` + dataFinal);
    }

    calendarioCadastrarExcecao(excecaoCalendario): Observable<any> {
        return this.http.post < { data: CalendarioExcecaoModel } > (`${AZFOOTFITNESS_API}/calendario/cadastrarexcecao/`, excecaoCalendario);
    }

    calendarioRemoverExcecaoByData(data): Observable<any> {
        return this.http.get<any>(`${AZFOOTFITNESS_API}/calendario/excluirexcecaobydata?data=` + data);
    }

    calendarioCarregarFeriadosByUFCidade(ano, mes, uf, cidade): Observable<any> {
        return this.http.get<any>(`${AZFOOTFITNESS_API}/calendario/carregaferiadoscidade?ano=` + ano + `&mes=` + mes + `&uf=` +
         uf + `&cidade=` + cidade);
    }

    MeuPerfilAtualizar(MeuPerfilAtualizarModel): Observable<any> {
        return this.http.post<any>(`${AZFOOTFITNESS_API}/usuario/atualizar/`, MeuPerfilAtualizarModel);
      }

}

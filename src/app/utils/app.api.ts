import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// tslint:disable-next-line:eofline
export const AZFOOTFITNESS_API = environment.apiBaseUrl;
export const HttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
    // 'Authorization': 'my-auth-token'
  })
};

export abstract class BaseService<T> {
  AZFOOTFITNESS_API = environment.apiBaseUrl;

  constructor() { }

  prepararParametros(filtro: any): string {
    let params = '?';

    if (filtro) {
      const paramsList = Object.keys(filtro)
        .map((param) => this.retornarParametrosComArray(param.toString(), filtro[param]))
        .join('&');

      params = params + paramsList;
    }

    return params;
  }

  retornarParametrosComArray(nome: string, campo: any): string {
    let textoArray = '';
    let caracterLigacao = '';
    if (Array.isArray(campo)) {
      campo.forEach(valor => {
        textoArray += caracterLigacao + nome + '=' + valor;
        caracterLigacao = '&';
      });
      return textoArray;
    }
    return nome + '=' + encodeURIComponent(campo);
  }

}

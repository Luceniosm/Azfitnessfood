import { AZFOOTFITNESS_API } from './../utils/app.api';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class LoginService {
  constructor(private http: HttpClient) { }

  loginCadastro(loginCadastro): Observable<any> {
    return this.http.post<any>(`${AZFOOTFITNESS_API}/account/register`, loginCadastro);
  }

  loginEsqueceu(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${AZFOOTFITNESS_API}/account/forgotPassword/${email}`);
  }

  loginTrocarSenha(loginTrocarSenha): Observable<any> {
    return this.http.post<any>(`${AZFOOTFITNESS_API}/account/changePassword`, loginTrocarSenha);
  }

  loginValidarEmail(email: string): Observable<any> {
    return this.http.get<any>(`${AZFOOTFITNESS_API}/account/confirmEmail/${email}`);
  }
}

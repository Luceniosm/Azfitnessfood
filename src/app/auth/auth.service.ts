import { AZFOOTFITNESS_API } from './../utils/app.api';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthModel } from '../models/authentication/auth.model';
import { ToastrService } from 'ngx-toastr';
import { Role } from './../models/authentication/role';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<AuthModel>;
  public currentUser: Observable<AuthModel>;

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {
    this.currentUserSubject = new BehaviorSubject<AuthModel>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AuthModel {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${AZFOOTFITNESS_API}/account`, { email, password })
      .pipe(map(user => {
        if (user && user.success) {
          if (user.data.authenticated === false) {
            this.toastr.error(user.data.message);
            return;
          }
          localStorage.setItem('currentUser', JSON.stringify(user.data));
          const rota = JSON.parse(localStorage.getItem('rota'));
          this.currentUserSubject.next(user.data);
          const dataUser = user.data.user;
          if (rota) {
            this.router.navigate([rota]);
            localStorage.removeItem('rota');
          } else if (dataUser.perfil.descricao.toUpperCase() === Role.Cliente) {
            this.router.navigate(['cliente/principal']);
          } else if (dataUser.perfil.descricao.toUpperCase() === Role.Admin) {
            this.router.navigate(['admin/principal']);
          } else if (dataUser.perfil.descricao.toUpperCase() === Role.Entregador) {
            this.router.navigate(['entregador/pedido']);
          } else if (dataUser.perfil.descricao.toUpperCase() === Role.Vendedor) {
            this.router.navigate(['vendedor/principal']);
          }
        }

        return user.data;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthModel } from 'src/app/models/authentication/auth.model';
import { Role } from 'src/app/models/authentication/role';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-principal',
  templateUrl: './home-principal.component.html',
  styleUrls: ['./home-principal.component.css']
})
export class HomePrincipalComponent implements OnInit {
  versao = environment.appVersion;
  mostratBotoesCliente = false;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    const userPerfil = (JSON.parse(localStorage.getItem('currentUser')) as AuthModel).user;
    if (userPerfil !== undefined) {
      if (userPerfil.perfil.descricao.toUpperCase() === Role.Cliente) {
        this.mostratBotoesCliente = true;
      }
    }
  }

  menuLink(link: string): void {
    try {
      this.router.navigate([link]);
    } catch (error) {
      alert(error);
    }
  }
}

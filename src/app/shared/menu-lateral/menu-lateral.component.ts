import { Component, OnInit } from '@angular/core';
import { AuthModel } from 'src/app/models/authentication/auth.model';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})

export class MenuLateralComponent implements OnInit {
  show: boolean;
  titulo: string;
  menuItens = [];
  currentUser: AuthModel;
  usuarioLogado = false;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.show = false;
  }

  ngOnInit() {
    this.show = false;
    this.initPage();
  }

  initPage() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) as AuthModel;
    if (this.currentUser !== null) {
      this.menuItens = this.currentUser.user.perfil.itensMenu.sort((itemA, itemB) => itemA.ordem - itemB.ordem);
      this.usuarioLogado = true;
    }
  }

  openMenu() {
    this.show = this.show === false ? true : false;
  }

  menuLink(titulo, menuLink) {
    this.titulo = titulo;
    this.router.navigate([menuLink]);
    this.show = this.show === false ? true : false;
  }

  sair(): void {
    this.usuarioLogado = false;
    this.authenticationService.logout();
    this.menuLink('', '/');
  }
}

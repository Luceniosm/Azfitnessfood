import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { AuthModel } from './models/authentication/auth.model';
import { Role } from './models/authentication/role';
import { BalaoConfirmacaoService } from './shared/balao-confirmacao/balao-confirmacao.service';
import { UpdateService } from './utils/update-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AzFitnessFood';
  constructor(
    private router: Router,
    private updateService: UpdateService,
    private balaoConfirmacaoService: BalaoConfirmacaoService,
    private swUpdate: SwUpdate
  ) { }

  ngOnInit() {
    this.limparIntervalos();
    this.updateClient();
    this.updateAppFromServe();
    setInterval(() => this.updateClient(), 1000 * 60 * 60);
  }

  updateClient(): void {
    this.swUpdate.available.subscribe(el => {
      console.log('current version is', el.current);
      console.log('available version is', el.available);
      if (confirm('update new version')) {
        this.swUpdate.activateUpdate().then(() => location.reload());
      }
    });

    this.swUpdate.activated.subscribe(el => {
      console.log('current version is', el.previous);
      console.log('available version is', el.current);
    });
  }
  limparIntervalos(): void {
    const interval_id = window.setInterval(function () { }, Number.MAX_SAFE_INTEGER);
    for (let i = interval_id; i >= 0; i--) {
      window.clearInterval(i);
    }
    console.log('interval clear!');
  }

  updateAppFromServe(): void {
    this.updateService.verificarAtualizacao()
      .subscribe(_ => {
        if (_.success) {
          if (environment.appVersion === _.data) {
            console.log('sistema atualizado');
            this.redirecionarQuandoLogado();
          } else {
            this.balaoConfirmacaoService.confirm({
              message: 'O sistema possui uma nova versão e será atualizado.',
              btnOkText: 'Ok',
              alert: true
            }).subscribe((result) => result ? this.limparCacheAtualizarPagina() : this.redirecionarQuandoLogado());
          }
        }
      });
  }

  limparCacheAtualizarPagina(): void {
    caches.keys().then(function (keyList) {
      keyList.forEach(function (nome) {
        caches.delete(nome);
      });
    });
    console.log('cache clear');
    window.location.reload();
  }

  redirecionarQuandoLogado() {
    const currentUser = (JSON.parse(localStorage.getItem('currentUser')) as AuthModel)?.user;
    if (currentUser !== undefined) {
      if (currentUser.perfil.descricao.toUpperCase() === Role.Admin) {
        this.router.navigate(['admin/principal']);
      } else if (currentUser.perfil.descricao.toUpperCase() === Role.Entregador) {
        this.router.navigate(['entregador/pedido']);
      } else if (currentUser.perfil.descricao.toUpperCase() === Role.Vendedor) {
        this.router.navigate(['vendedor/principal']);
      }
    }
  }
}

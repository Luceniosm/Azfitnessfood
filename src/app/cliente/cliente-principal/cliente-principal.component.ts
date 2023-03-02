import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AuthModel } from 'src/app/models/authentication/auth.model';
import { Role } from 'src/app/models/authentication/role';
import { BalaoConfirmacaoService } from 'src/app/shared/balao-confirmacao/balao-confirmacao.service';
import { UpdateService } from 'src/app/utils/update-service';
import { environment } from 'src/environments/environment';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-principal',
  templateUrl: './cliente-principal.component.html',
  styleUrls: ['./cliente-principal.component.css']
})
export class ClientePrincipalComponent implements OnInit {
  versao = environment.appVersion;
  constructor(
    private router: Router,
    private rotaAtual: ActivatedRoute,
    private clienteService: ClienteService,
    private toastr: ToastrService,
    private cookieService: CookieService,
    private updateService: UpdateService,
    private balaoConfirmacaoService: BalaoConfirmacaoService,
  ) { }

  ngOnInit() {
    this.validarCadastroDeEndereco();
    this.cookieService.deleteAll();
  }

  validarCadastroDeEndereco(): void {
    const userId = (JSON.parse(localStorage.getItem('currentUser')) as AuthModel).user.idUsuario;
    this.clienteService.validarCadastroDeEndereco(userId)
      .subscribe(_ => {
        if (_.success) {
          if (!_.data) {
            this.toastr.info('Cadastre o endereço para entrega');
            this.router.navigate([`/cliente/endereco`]);

          }
        }
      });
  }

  menuLink(menuLink) {
    this.router.navigate([`/cliente/${menuLink}`], { relativeTo: this.rotaAtual });
  }

  verificarAtualizacao(): void {
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
    window.location.reload();
  }

  redirecionarQuandoLogado() {
    const currentUser = (JSON.parse(localStorage.getItem('currentUser')) as AuthModel)?.user;
    if (currentUser !== undefined) {
      if (currentUser.perfil.descricao.toUpperCase() === Role.Admin) {
        this.router.navigate(['admin/principal']);
      } else if (currentUser.perfil.descricao.toUpperCase() === Role.Entregador) {
        this.router.navigate(['entregador/pedido']);
      }
    }
  }
}

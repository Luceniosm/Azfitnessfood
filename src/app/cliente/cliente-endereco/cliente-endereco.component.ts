import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ClienteEnderecoService } from 'src/app/cliente/cliente-endereco/cliente-endereco.service';
import { AuthModel } from 'src/app/models/authentication/auth.model';
import { UserModel } from 'src/app/models/authentication/user.model';
import { ClienteEndereco } from './cliente-endereco.model.ts/cliente-menu-endereco.model';
import { BalaoConfirmacaoService } from 'src/app/shared/balao-confirmacao/balao-confirmacao.service';
import { CookieService } from 'ngx-cookie-service';
import { NavigationExtras, Router } from '@angular/router';




@Component({
  selector: 'app-cliente-endereco',
  templateUrl: './cliente-endereco.component.html',
  styleUrls: ['./cliente-endereco.component.css']
})

export class ClienteEnderecoComponent implements OnInit {

  enderecos = Array<ClienteEndereco>();
  usuarioLogado: UserModel;

  constructor(
    private clienteEnderecoService: ClienteEnderecoService,
    private toastr: ToastrService,
    private balaoConfirmacaoService: BalaoConfirmacaoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUsuarioLogado();
    this.listaEnderecosUsuario();
  }

  getUsuarioLogado() {
    this.usuarioLogado = (JSON.parse(localStorage.getItem('currentUser')) as AuthModel).user;
  }

  listaEnderecosUsuario() {
    this.clienteEnderecoService.clienteListEndereco(this.usuarioLogado.idUsuario).subscribe(_ => {
      if (_.success) {
        this.enderecos = _.data;
      }
    },
      error => { this.enderecos = []; }
    );
  }

  confirmarExclusao(enderecoId: string) {
    this.clienteEnderecoService.consultaEndereco(enderecoId).subscribe(_ => {
      if (_.success) {
        if (!_.data.lgPrincipal) {
          this.balaoConfirmacaoService.confirm(
            {
              message: 'Dejesa confirmar a EXCLUSÃO do endereço selecionado?',
              btnOkText: 'Sim',
              btnCancelText: 'Não'
            }
          ).subscribe((result) => result ? this.excluir(enderecoId) : null);
        } else {
          this.toastr.warning('Endereço padrão de entregas, não pode ser removido!');
        }
      }
    });
  }

  excluir(enderecoId: string) {
    this.clienteEnderecoService.removeEndereco(enderecoId).subscribe(_ => {
      if (_.success) {
        this.listaEnderecosUsuario();
        this.toastr.success('Endereço removido com sucesso!');
      } else {
        this.toastr.error('Um erro ocorreu na tentativa de exclusão do endereço.');
      }
    });
  }

  confirmarAlteracao(enderecoId: string) {
    this.balaoConfirmacaoService.confirm(
      {
        message: 'Dejesa confirmar a ALTERAÇÃO do endereço principal de entregas?',
        btnOkText: 'Sim',
        btnCancelText: 'Não'
      }
    ).subscribe((result) => result ? this.alterar(enderecoId) : null);
  }

  alterar(enderecoId: string) {
    if (this.enderecos.length > 1) {
      this.clienteEnderecoService.alteraLocalPadraoEntrega(enderecoId).subscribe(_ => {
        if (_.success) {
          this.listaEnderecosUsuario();
          this.toastr.success('Endereço Padrão Alterado com Sucesso!');
        } else {
          this.toastr.error('Um erro ocorreu na tentativa de alteração do endereço.');
        }
      });
    }
  }
  editar(item: ClienteEndereco) {
    const navigationExtras: NavigationExtras = {
      state: {
        endereco: item,
      }
    };
    this.router.navigate([`/cliente/endereco/cadastro`], navigationExtras);
  }
}

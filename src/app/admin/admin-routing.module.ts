import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { LoginTrocarSenhaComponent } from '../login/login-trocar-senha/login-trocar-senha.component';
import { Role } from '../models/authentication/role';
import { ContatoComponent } from '../shared/contato/contato.component';
import { LojaCadastroComponent } from '../shared/loja/loja-cadastro/loja-cadastro.component';
import { MeuPerfilComponent } from '../shared/meu-perfil/meu-perfil.component';
import { PaginaNaoAutorizadaComponent } from '../shared/pagina-nao-autorizada/pagina-nao-autorizada.component';
import { PaginaNaoEncontradaComponent } from '../shared/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { AdminCalendarioComponent } from './admin-calendario/admin-calendario.component';
import { AdminCardapioCadastroComponent } from './admin-cardapio/admin-cardapio-cadastro/admin-cardapio-cadastro.component';
import { AdminCardapioComponent } from './admin-cardapio/admin-cardapio.component';
import { AdminClienteCadastroComponent } from './admin-cliente/admin-cliente-cadastro/admin-cliente-cadastro.component';
import { AdminClienteComponent } from './admin-cliente/admin-cliente.component';
import { AdminConfiguracaoComponent } from './admin-configuracao/admin-configuracao.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminListarEntregaComponent } from './admin-entrega/admin-listar-entrega.component';
import { AdminEntregadorCadastrarComponent } from './admin-entregador/admin-entregador-cadastrar/admin-entregador-cadastrar.component';
import { AdminListarEntregadorComponent } from './admin-entregador/admin-listar-entregador.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminPacoteCadastroComponent } from './admin-pacote/admin-pacote-cadastro/admin-pacote-cadastro.component';
import { AdminPacoteComponent } from './admin-pacote/admin-pacote.component';
import { AdminPrincipalComponent } from './admin-principal/admin-principal.component';

const routes: Routes = [
  {
    path: '', component: AdminHomeComponent,
    children: [
      { path: 'meuPerfil', component: MeuPerfilComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: 'principal', component: AdminPrincipalComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: 'calendario', component: AdminCalendarioComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      {
        path: 'cardapio',
        children: [
          { path: '', component: AdminCardapioComponent },
          { path: 'cadastro', component: AdminCardapioCadastroComponent },
          { path: 'copiar/:id', component: AdminCardapioCadastroComponent },
          { path: 'edicao/:id', component: AdminCardapioCadastroComponent }
        ],
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
      },
      {
        path: 'entregador',
        children: [
          { path: '', component: AdminListarEntregadorComponent },
          { path: 'cadastro', component: AdminEntregadorCadastrarComponent },
          { path: 'edicao/:id', component: AdminEntregadorCadastrarComponent }
        ],
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
      },
      {
        path: 'pacote',
        children: [
          { path: '', component: AdminPacoteComponent },
          { path: 'cadastro', component: AdminPacoteCadastroComponent },
          { path: 'editar/:id', component: AdminPacoteCadastroComponent },
          { path: 'duplicar/:id', component: AdminPacoteCadastroComponent },
        ],
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
      },
      { path: 'contato', component: ContatoComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: 'alterarSenha', component: LoginTrocarSenhaComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      {
        path: 'entregas',
        children: [
          { path: '', component: AdminListarEntregaComponent }
        ],
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
      },
      {
        path: 'clientes',
        children: [
          { path: '', component: AdminClienteComponent },
          { path: 'cadastro', component: AdminClienteCadastroComponent },
          { path: 'edicao/:id', component: AdminClienteCadastroComponent }
        ],
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
      },
      { path: 'dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: 'loja', component: LojaCadastroComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: 'configuracao', component: AdminConfiguracaoComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: '**', component: PaginaNaoEncontradaComponent },
      { path: 'naoAutorizada', component: PaginaNaoAutorizadaComponent },

    ],
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

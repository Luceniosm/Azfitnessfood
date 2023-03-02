import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { LoginTrocarSenhaComponent } from '../login/login-trocar-senha/login-trocar-senha.component';
import { Role } from '../models/authentication/role';
import { CardapioComponent } from '../shared/cardapio/cardapio.component';
import { ContatoComponent } from '../shared/contato/contato.component';
import { ContratarPacoteComponent } from '../shared/contratar-pacote/contratar-pacote.component';
import { LojaPagamentoComponent } from '../shared/loja/loja-pagamento/loja-pagamento.component';
import { MeuPerfilComponent } from '../shared/meu-perfil/meu-perfil.component';
import { PaginaNaoEncontradaComponent } from '../shared/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { PedidoComponent } from '../shared/pedido/pedido.component';
import { ClienteEnderecoCadastroComponent } from './cliente-endereco/cliente-endereco-cadastro/cliente-endereco-cadastro.component';
import { ClienteEnderecoComponent } from './cliente-endereco/cliente-endereco.component';
import { ClienteHomeComponent } from './cliente-home/cliente-home.component';
import { ClientePacoteAnteciparComponent } from './cliente-pacote/cliente-pacote-antecipar/cliente-pacote-antecipar.component';
import { ClientePacoteStatusComponent } from './cliente-pacote/cliente-pacote-status/cliente-pacote-status.component';
import { ClientePacoteSuspenderComponent } from './cliente-pacote/cliente-pacote-suspender/cliente-pacote-suspender.component';
import { ClientePacoteComponent } from './cliente-pacote/cliente-pacote.component';
import { ClientePrincipalComponent } from './cliente-principal/cliente-principal.component';


const routes: Routes = [
  {
    path: '', component: ClienteHomeComponent,
    children: [
      { path: '', redirectTo: 'principal', pathMatch: 'full' },
      { path: 'principal', component: ClientePrincipalComponent, canActivate: [AuthGuard], data: { roles: [Role.Cliente] } },
      { path: 'meuPerfil', component: MeuPerfilComponent, canActivate: [AuthGuard], data: { roles: [Role.Cliente] } },
      { path: 'contato', component: ContatoComponent, canActivate: [AuthGuard], data: { roles: [Role.Cliente] } },
      { path: 'alterarSenha', component: LoginTrocarSenhaComponent, canActivate: [AuthGuard], data: { roles: [Role.Cliente] } },
      {
        path: 'endereco',
        children: [
          { path: '', component: ClienteEnderecoComponent },
          { path: 'cadastro', component: ClienteEnderecoCadastroComponent, canActivate: [AuthGuard] }
        ],
        canActivate: [AuthGuard],
        data: { roles: [Role.Cliente] }
      },
      { path: 'menu', component: ContratarPacoteComponent, canActivate: [AuthGuard], data: { roles: [Role.Cliente] } },
      { path: 'cardapio', component: CardapioComponent, canActivate: [AuthGuard], data: { roles: [Role.Cliente] } },
      {
        path: 'pacote', component: ClientePacoteComponent,
        children: [
          { path: '', redirectTo: 'status', pathMatch: 'full' },
          { path: 'status', component: ClientePacoteStatusComponent },
          { path: 'status/:userId', component: ClientePacoteStatusComponent },
          { path: 'antecipar', component: ClientePacoteAnteciparComponent },
          { path: 'antecipar/:userId', component: ClientePacoteAnteciparComponent },
          { path: 'suspender', component: ClientePacoteSuspenderComponent },
          { path: 'suspender/:userId', component: ClientePacoteSuspenderComponent }
        ],
        canActivate: [AuthGuard],
        data: { roles: [Role.Cliente, Role.Admin] }
      },
      { path: 'pagamento', component: LojaPagamentoComponent, canActivate: [AuthGuard], data: { roles: [Role.Cliente] } },
      { path: 'pedido', component: PedidoComponent, canActivate: [AuthGuard], data: { roles: [Role.Cliente] } },
      { path: '**', component: PaginaNaoEncontradaComponent },
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }

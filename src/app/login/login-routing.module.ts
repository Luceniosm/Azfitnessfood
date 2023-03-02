import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmeEmailComponent } from './confirme-email/confirme-email.component';
import { LoginCadastroSucessoComponent } from './login-cadastro-sucesso/login-cadastro-sucesso.component';
import { LoginCadastroComponent } from './login-cadastro/login-cadastro.component';
import { LoginEsqueceuComponent } from './login-esqueceu/login-esqueceu.component';
import { LoginComponent } from './login.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'loginCadastroSucesso', component: LoginCadastroSucessoComponent },
  { path: 'loginCadastro', component: LoginCadastroComponent },
  { path: 'loginCadastro/:visualizar', component: LoginCadastroComponent },
  { path: 'confirmeEmail', component: ConfirmeEmailComponent, data: { email: '' } },
  { path: 'loginEsqueceu', component: LoginEsqueceuComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }

import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { NgxMaskModule } from 'ngx-mask';
import { ConfirmeEmailComponent } from './confirme-email/confirme-email.component';
import { LoginCadastroSucessoComponent } from './login-cadastro-sucesso/login-cadastro-sucesso.component';
import { LoginCadastroComponent } from './login-cadastro/login-cadastro.component';
import { LoginEsqueceuComponent } from './login-esqueceu/login-esqueceu.component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LoginTituloComponent } from './login-titulo/login-titulo.component';
import { LoginInstallAppIosComponent } from './login-install-app-ios/login-install-app-ios.component';


@NgModule({
  declarations: [
    LoginComponent,
    LoginEsqueceuComponent,
    LoginCadastroComponent,
    LoginCadastroSucessoComponent,
    ConfirmeEmailComponent,
    LoginTituloComponent,
    LoginInstallAppIosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    HttpClientModule,
    LoginRoutingModule
  ],
  providers: [
    CookieService,
    DatePipe
  ]
})


export class LoginModule { }

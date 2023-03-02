import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
// MODULE
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClienteEnderecoCadastroComponent } from './cliente-endereco/cliente-endereco-cadastro/cliente-endereco-cadastro.component';
import { ClienteEnderecoComponent } from './cliente-endereco/cliente-endereco.component';
import { ClienteHomeComponent } from './cliente-home/cliente-home.component';
import { ClientePacoteAnteciparCalendarioComponent } from './cliente-pacote/cliente-pacote-antecipar/cliente-pacote-antecipar-calendario/cliente-pacote-antecipar-calendario.component';
import { ClientePacoteAnteciparQuantidadeComponent } from './cliente-pacote/cliente-pacote-antecipar/cliente-pacote-antecipar-quantidade/cliente-pacote-antecipar-quantidade.component';
import { ClientePacoteAnteciparComponent } from './cliente-pacote/cliente-pacote-antecipar/cliente-pacote-antecipar.component';
import { ClientePacoteContratadoComponent } from './cliente-pacote/cliente-pacote-contratado/cliente-pacote-contratado.component';
import { ClientePacoteStatusComponent } from './cliente-pacote/cliente-pacote-status/cliente-pacote-status.component';
import { ClientePacoteSuspenderCalendarioComponent } from './cliente-pacote/cliente-pacote-suspender/cliente-pacote-suspender-calendario/cliente-pacote-suspender-calendario.component';
import { ClientePacoteSuspenderComponent } from './cliente-pacote/cliente-pacote-suspender/cliente-pacote-suspender.component';
import { ClientePacoteComponent } from './cliente-pacote/cliente-pacote.component';
import { ClientePrincipalComponent } from './cliente-principal/cliente-principal.component';
import { ClienteRoutingModule } from './cliente-routing.module';
registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    ClienteHomeComponent,
    ClientePrincipalComponent,
    ClienteEnderecoComponent,
    ClienteEnderecoCadastroComponent,
    ClientePacoteComponent,
    ClientePacoteContratadoComponent,
    ClientePacoteAnteciparComponent,
    ClientePacoteSuspenderComponent,
    ClientePacoteStatusComponent,
    ClientePacoteAnteciparCalendarioComponent,
    ClientePacoteAnteciparQuantidadeComponent,
    ClientePacoteSuspenderCalendarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClienteRoutingModule,
    HttpClientModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    NgxMaskModule.forRoot(),
    CarouselModule.forRoot(),
    SharedModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    DatePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ClienteModule { }

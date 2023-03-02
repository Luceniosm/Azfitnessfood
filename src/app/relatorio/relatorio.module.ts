import { CommonModule, registerLocaleData } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { EntregaComponent } from './entrega/entrega.component';
import { RelatorioRoutingModule } from './relatorio-routing.module';
import { SharedModule } from '../shared/shared.module';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt, 'pt-BR');



@NgModule({
  declarations: [
    CabecalhoComponent,
    EntregaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RelatorioRoutingModule,
    NgxMaskModule.forRoot(),
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class RelatorioModule { }

import { NgModule } from '@angular/core';
import { EntregadorEntregaComponent } from './entregador-entrega/entregador-entrega.component';
import { EntregadorHomeComponent } from './entregador-home/entregador-home.component';
import { SharedModule } from '../shared/shared.module';
import { EntregadorRoutingModule } from './entrega-routing.module';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { NgxMaskModule } from 'ngx-mask';
import { EntregadorCardapioComponent } from './entregador-cardapio/entregador-cardapio.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AlertModule } from 'ngx-bootstrap/alert';
registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    EntregadorEntregaComponent,
    EntregadorHomeComponent,
    EntregadorCardapioComponent
  ],
  imports: [
    EntregadorRoutingModule,
    SharedModule,
    NgxMaskModule,
    TabsModule.forRoot(),
    CarouselModule.forRoot(),
    AlertModule.forRoot(),
  ],
  providers: [
  ]
})


export class EntregadorModule { }

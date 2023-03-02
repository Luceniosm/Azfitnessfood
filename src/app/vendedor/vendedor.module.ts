import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendedorRoutingModule } from './vendedor-routing.module';
import { VendedorHomeComponent } from './vendedor-home/vendedor-home.component';
import { SharedModule } from '../shared/shared.module';
import { VendedorPrincipalComponent } from './vendedor-principal/vendedor-principal.component';
@NgModule({
  declarations: [
    VendedorHomeComponent,
    VendedorPrincipalComponent
  ],
  imports: [
    CommonModule,
    VendedorRoutingModule,
    SharedModule,
  ]
})
export class VendedorModule { }

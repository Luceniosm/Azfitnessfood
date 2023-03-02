import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntregadorEntregaComponent } from './entregador-entrega/entregador-entrega.component';
import { EntregadorHomeComponent } from './entregador-home/entregador-home.component';
import { AuthGuard } from '../auth/auth.guard';
import { Role } from '../models/authentication/role';
import { EntregadorCardapioComponent } from './entregador-cardapio/entregador-cardapio.component';

const routes: Routes = [
  {
    path: '', component: EntregadorHomeComponent,
    children: [
      { path: '', redirectTo: 'pedido', pathMatch: 'full' },
      { path: 'pedido', component: EntregadorEntregaComponent, canActivate: [AuthGuard], data: { roles: [Role.Entregador] } },
      { path: 'cardapio', component: EntregadorCardapioComponent, canActivate: [AuthGuard], data: { roles: [Role.Entregador] } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntregadorRoutingModule { }


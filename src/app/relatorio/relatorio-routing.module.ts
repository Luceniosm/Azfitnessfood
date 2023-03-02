import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { EntregaComponent } from './entrega/entrega.component';
import { AuthGuard } from '../auth/auth.guard';
import { Role } from '../models/authentication/role';


const routes: Routes = [
  {
    path: '',  component: CabecalhoComponent,
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: 'entrega/:data/:idEntregador/:idTipoPacote', component: EntregaComponent },

    ],
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatorioRoutingModule { }

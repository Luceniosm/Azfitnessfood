import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { Role } from '../models/authentication/role';
import { LojaCadastroComponent } from '../shared/loja/loja-cadastro/loja-cadastro.component';
import { VendedorHomeComponent } from './vendedor-home/vendedor-home.component';
import { VendedorPrincipalComponent } from './vendedor-principal/vendedor-principal.component';

const routes: Routes = [
  {
    path: '', component: VendedorHomeComponent,
    children: [
      { path: '', redirectTo: 'principal', pathMatch: 'full' },
      { path: 'principal', component: VendedorPrincipalComponent, canActivate: [AuthGuard], data: { roles: [Role.Vendedor] } },
      { path: 'cadastro', component: LojaCadastroComponent, canActivate: [AuthGuard], data: { roles: [Role.Vendedor] } },
    ],
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendedorRoutingModule { }

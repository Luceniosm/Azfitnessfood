import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaNaoAutorizadaComponent } from './shared/pagina-nao-autorizada/pagina-nao-autorizada.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module')
      .then(mod => mod.HomeModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module')
      .then(mod => mod.LoginModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module')
      .then(mod => mod.AdminModule)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./cliente/cliente.module')
      .then(mod => mod.ClienteModule)
  },
  {
    path: 'entregador',
    loadChildren: () => import('./entregador/entregador.module')
      .then(mod => mod.EntregadorModule)
  },
  {
    path: 'relatorio',
    loadChildren: () => import('./relatorio/relatorio.module')
      .then(mod => mod.RelatorioModule)
  },
  {
    path: 'vendedor',
    loadChildren: () => import('./vendedor/vendedor.module')
      .then(mod => mod.VendedorModule)
  },
  { path: 'naoAutorizada', component: PaginaNaoAutorizadaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', useHash: true, onSameUrlNavigation: 'reload', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

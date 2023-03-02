import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardapioComponent } from '../shared/cardapio/cardapio.component';
import { ContratarPacoteComponent } from '../shared/contratar-pacote/contratar-pacote.component';
import { LojaCarrinhoComponent } from '../shared/loja/loja-carrinho/loja-carrinho.component';
import { LojaProdutoDetalheComponent } from '../shared/loja/loja-produto-detalhe/loja-produto-detalhe.component';
import { LojaComponent } from '../shared/loja/loja.component';
import { HomePrincipalComponent } from './home-principal/home-principal.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: '', redirectTo: 'principal', pathMatch: 'full' },
      { path: 'principal', component: HomePrincipalComponent },
      { path: 'comprar', component: ContratarPacoteComponent },
      { path: 'cardapio', component: CardapioComponent },
      { path: 'loja', component: LojaComponent},
      { path: 'loja/produto/:idProduto', component: LojaProdutoDetalheComponent},
      { path: 'loja/carrinho', component: LojaCarrinhoComponent},
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

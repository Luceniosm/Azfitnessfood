import { CommonModule, registerLocaleData } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CookieService } from 'ngx-cookie-service';
import { NgxMaskModule } from 'ngx-mask';
import { LoginTrocarSenhaComponent } from '../login/login-trocar-senha/login-trocar-senha.component';
import { BalaoConfirmacaoComponent } from './balao-confirmacao/balao-confirmacao.component';
import { BalaoConfirmacaoService } from './balao-confirmacao/balao-confirmacao.service';
import { BalaoTextoComponent } from './balao-texto/balao-texto.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { CardapioComponent } from './cardapio/cardapio.component';
import { ContatoComponent } from './contato/contato.component';
import { ContratarPacoteCategoriaComponent } from './contratar-pacote/contratar-pacote-categoria/contratar-pacote-categoria.component';
import { ContratarPacoteContratadoComponent } from './contratar-pacote/contratar-pacote-contratado/contratar-pacote-contratado.component';
import { ContratarPacoteComponent } from './contratar-pacote/contratar-pacote.component';
import { DesabilitarInputFormDirective } from './desabilitar-input-form.directive';
import { FooterComponent } from './footer/footer.component';
import { LojaCarrinhoItemContadorComponent } from './loja/loja-carrinho-item-contador/loja-carrinho-item-contador.component';
import { LojaCarrinhoResumoComponent } from './loja/loja-carrinho-resumo/loja-carrinho-resumo.component';
import { LojaCarrinhoComponent } from './loja/loja-carrinho/loja-carrinho.component';
import { LojaCarrinhoService } from './loja/loja-carrinho/loja-carrinho.service';
import { LojaPagamentoComponent } from './loja/loja-pagamento/loja-pagamento.component';
import { LojaProdutoDetalheComponent } from './loja/loja-produto-detalhe/loja-produto-detalhe.component';
import { LojaComponent } from './loja/loja.component';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { MeuPerfilComponent } from './meu-perfil/meu-perfil.component';
import { PaginaNaoAutorizadaComponent } from './pagina-nao-autorizada/pagina-nao-autorizada.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { SharedWizardComponent } from './shared-wizard/shared-wizard.component';
import { LojaPedidoFinalizadoComponent } from './loja/loja-pedido-finalizado/loja-pedido-finalizado.component';
import { PedidoComponent } from './pedido/pedido.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { LojaCadastroComponent } from './loja/loja-cadastro/loja-cadastro.component';
import { LojaCadastroCategoriaComponent } from './loja/loja-cadastro/loja-cadastro-categoria/loja-cadastro-categoria.component';
import { LojaCadastroProdutoComponent } from './loja/loja-cadastro/loja-cadastro-produto/loja-cadastro-produto.component';
import { LojaCadastroCategoriaCadastroComponent } from './loja/loja-cadastro/loja-cadastro-categoria/loja-cadastro-categoria-cadastro/loja-cadastro-categoria-cadastro.component';
import { LojaCadastroProdutoCadastroComponent } from './loja/loja-cadastro/loja-cadastro-produto/loja-cadastro-produto-cadastro/loja-cadastro-produto-cadastro.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxCurrencyModule } from 'ngx-currency';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    FooterComponent,
    MenuLateralComponent,
    CalendarioComponent,
    MeuPerfilComponent,
    ContatoComponent,
    BalaoTextoComponent,
    DesabilitarInputFormDirective,
    PaginaNaoEncontradaComponent,
    PaginaNaoAutorizadaComponent,
    SharedWizardComponent,
    BalaoConfirmacaoComponent,
    LoginTrocarSenhaComponent,
    ContratarPacoteComponent,
    ContratarPacoteCategoriaComponent,
    ContratarPacoteContratadoComponent,
    CardapioComponent,
    LojaComponent,
    LojaCarrinhoComponent,
    LojaProdutoDetalheComponent,
    LojaCarrinhoItemContadorComponent,
    LojaPagamentoComponent,
    LojaCarrinhoResumoComponent,
    LojaPedidoFinalizadoComponent,
    PedidoComponent,
    LojaCadastroComponent,
    LojaCadastroCategoriaComponent,
    LojaCadastroProdutoComponent,
    LojaCadastroCategoriaCadastroComponent,
    LojaCadastroProdutoCadastroComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxMaskModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    CarouselModule.forRoot(),
    AlertModule.forRoot(),
    AccordionModule.forRoot(),
    CollapseModule.forRoot(),
    NgxCurrencyModule,
    NgxPaginationModule,
    CKEditorModule
  ],
  exports: [
    FooterComponent,
    MenuLateralComponent,
    CalendarioComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MeuPerfilComponent,
    ContatoComponent,
    DesabilitarInputFormDirective,
    SharedWizardComponent,
    BalaoConfirmacaoComponent,
    LoginTrocarSenhaComponent,
    ContratarPacoteComponent,
    ContratarPacoteCategoriaComponent,
    ContratarPacoteContratadoComponent,
    CardapioComponent,
    LojaComponent,
    LojaCarrinhoComponent,
    LojaProdutoDetalheComponent,
    LojaPagamentoComponent,
    PedidoComponent,
    AccordionModule,
    NgxCurrencyModule,
    NgxPaginationModule,
    CKEditorModule,
    NgxMaskModule,
    LojaCadastroComponent,
    LojaCadastroCategoriaComponent,
    LojaCadastroProdutoComponent,
    LojaCadastroCategoriaCadastroComponent,
    LojaCadastroProdutoCadastroComponent
  ],
  providers: [
    BalaoConfirmacaoService,
    CookieService,
    LojaCarrinhoService,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [BalaoConfirmacaoComponent, BalaoTextoComponent],
})

export class SharedModule { }

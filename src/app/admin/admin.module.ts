import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

// MODULE
import { AdminCalendarioComponent } from 'src/app/admin/admin-calendario/admin-calendario.component';
import { AdminCardapioCadastroComponent } from 'src/app/admin/admin-cardapio/admin-cardapio-cadastro/admin-cardapio-cadastro.component';
import { AdminCardapioComponent } from 'src/app/admin/admin-cardapio/admin-cardapio.component';
import { AdminHomeComponent } from 'src/app/admin/admin-home/admin-home.component';
// COMPONENT
import { AdminPrincipalComponent } from 'src/app/admin/admin-principal/admin-principal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbdSortableHeader } from 'src/app/utils/sortable.directive';
import { SafePipe } from '../safe.pipe';
import { SortByPipe } from '../utils/app.sort-by-pipe';
import { AdminCalendarioModalComponent } from './admin-calendario/admin-calendario-modal/admin-calendario-modal.component';
import { AdminClienteCadastroComponent } from './admin-cliente/admin-cliente-cadastro/admin-cliente-cadastro.component';
import { AdminClienteContratoPedidoModalComponent } from './admin-cliente/admin-cliente-contrato-pedido-modal/admin-cliente-contrato-pedido-modal.component';
import { AdminClienteContratoPedidoComponent } from './admin-cliente/admin-cliente-contrato-pedido/admin-cliente-contrato-pedido.component';
import { AdminClienteContratoComponent } from './admin-cliente/admin-cliente-contrato/admin-cliente-contrato.component';
import { AdminClienteDadosPessoaisComponent } from './admin-cliente/admin-cliente-dados-pessoais/admin-cliente-dados-pessoais.component';
import { AdminClienteEnderecoComponent } from './admin-cliente/admin-cliente-endereco/admin-cliente-endereco.component';
import { AdminClientePedidoComponent } from './admin-cliente/admin-cliente-pedido/admin-cliente-pedido.component';
import { AdminClienteComponent } from './admin-cliente/admin-cliente.component';
import { AdminConfiguracaoExpedienteComponent } from './admin-configuracao/admin-configuracao-expediente/admin-configuracao-expediente.component';
// tslint:disable-next-line: max-line-length
import { AdminConfiguracaoFormaPagamentoCadastroComponent } from './admin-configuracao/admin-configuracao-forma-pagamento/admin-configuracao-forma-pagamento-cadastro/admin-configuracao-forma-pagamento-cadastro.component';
import { AdminConfiguracaoFormaPagamentoComponent } from './admin-configuracao/admin-configuracao-forma-pagamento/admin-configuracao-forma-pagamento.component';
// tslint:disable-next-line: max-line-length
import { AdminConfiguracaoTermoCondicaoCadastroComponent } from './admin-configuracao/admin-configuracao-termo-condicao/admin-configuracao-termo-condicao-cadastro/admin-configuracao-termo-condicao-cadastro.component';
import { AdminConfiguracaoTermoCondicaoComponent } from './admin-configuracao/admin-configuracao-termo-condicao/admin-configuracao-termo-condicao.component';
import { AdminConfiguracaoComponent } from './admin-configuracao/admin-configuracao.component';
import { AdminDashboardDietaComponent } from './admin-dashboard/admin-dashboard-dieta/admin-dashboard-dieta.component';
import { AdminDashboardEnderecoAlteradoComponent } from './admin-dashboard/admin-dashboard-endereco-alterado/admin-dashboard-endereco-alterado.component';
import { AdminDashboardFaturamentoComponent } from './admin-dashboard/admin-dashboard-faturamento/admin-dashboard-faturamento.component';
import { AdminDashboardInicioTerminoContratacaoComponent } from './admin-dashboard/admin-dashboard-inicio-termino-contratacao/admin-dashboard-inicio-termino-contratacao.component';
import { AdminDashboardPagamentoAbertoComponent } from './admin-dashboard/admin-dashboard-pagamento-aberto/admin-dashboard-pagamento-aberto.component';
import { AdminDashboardSuspensoAntecipadoComponent } from './admin-dashboard/admin-dashboard-suspenso-antecipado/admin-dashboard-suspenso-antecipado.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
// tslint:disable-next-line: max-line-length
import { AdminEntregaAlterarEntregadorComponent } from './admin-entrega/admin-entrega-alterar-entregador/admin-entrega-alterar-entregador.component';
import { AdminListarEntregaComponent } from './admin-entrega/admin-listar-entrega.component';
import { AdminEntregadorCadastrarComponent } from './admin-entregador/admin-entregador-cadastrar/admin-entregador-cadastrar.component';
import { AdminListarEntregadorComponent } from './admin-entregador/admin-listar-entregador.component';
// componets
import { AdminPacoteCadastroComponent } from './admin-pacote/admin-pacote-cadastro/admin-pacote-cadastro.component';
import { AdminPacoteCategoriaCadastroComponent } from './admin-pacote/admin-pacote-categoria/admin-pacote-categoria-cadastro/admin-pacote-categoria-cadastro.component';
import { AdminPacoteCategoriaComplementoItemComponent } from './admin-pacote/admin-pacote-categoria/admin-pacote-categoria-complemento/admin-pacote-categoria-complemento-item/admin-pacote-categoria-complemento-item.component';
import { AdminPacoteCategoriaComplementoComponent } from './admin-pacote/admin-pacote-categoria/admin-pacote-categoria-complemento/admin-pacote-categoria-complemento.component';

import { AdminPacoteCategoriaComponent } from './admin-pacote/admin-pacote-categoria/admin-pacote-categoria.component';
import { AdminPacoteComponent } from './admin-pacote/admin-pacote.component';
import { AdminRoutingModule } from './admin-routing.module';
import { TagInputModule } from 'ngx-chips';
import { AdminClienteContratoCadastroComponent } from './admin-cliente/admin-cliente-contrato-cadastro/admin-cliente-contrato-cadastro.component';
import { AdminConfiguracaoCupomDescontoComponent } from './admin-configuracao/admin-configuracao-cupom-desconto/admin-configuracao-cupom-desconto.component';
import { AdminConfiguracaoCupomDescontoCadastroComponent } from './admin-configuracao/admin-configuracao-cupom-desconto/admin-configuracao-cupom-desconto-cadastro/admin-configuracao-cupom-desconto-cadastro.component';
import { AdminDashboardPesoComponent } from './admin-dashboard/admin-dashboard-peso/admin-dashboard-peso.component';
import { AdminDashboardPedidoComponent } from './admin-dashboard/admin-dashboard-pedido/admin-dashboard-pedido.component';


registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AdminHomeComponent,
    AdminPrincipalComponent,
    AdminCalendarioComponent,
    AdminCardapioComponent,
    AdminCardapioCadastroComponent,
    AdminPacoteComponent,
    AdminListarEntregadorComponent,
    AdminEntregadorCadastrarComponent,
    NgbdSortableHeader,
    SafePipe,
    SortByPipe,
    AdminPacoteCadastroComponent,
    AdminListarEntregaComponent,
    AdminEntregaAlterarEntregadorComponent,
    AdminClienteComponent,
    AdminClienteCadastroComponent,
    AdminClienteEnderecoComponent,
    AdminCalendarioModalComponent,
    AdminDashboardComponent,
    AdminDashboardPagamentoAbertoComponent,
    AdminDashboardSuspensoAntecipadoComponent,
    AdminDashboardInicioTerminoContratacaoComponent,
    AdminDashboardDietaComponent,
    AdminDashboardFaturamentoComponent,
    AdminConfiguracaoComponent,
    AdminConfiguracaoExpedienteComponent,
    AdminConfiguracaoTermoCondicaoComponent,
    AdminConfiguracaoTermoCondicaoCadastroComponent,
    AdminConfiguracaoFormaPagamentoComponent,
    AdminConfiguracaoFormaPagamentoCadastroComponent,
    AdminClienteDadosPessoaisComponent,
    AdminClientePedidoComponent,
    AdminClienteContratoComponent,
    AdminClienteContratoPedidoComponent,
    AdminClienteContratoPedidoModalComponent,
    AdminDashboardEnderecoAlteradoComponent,
    AdminPacoteCategoriaComponent,
    AdminPacoteCategoriaComplementoComponent,
    AdminPacoteCategoriaCadastroComponent,
    AdminPacoteCategoriaComplementoItemComponent,
    AdminClienteContratoCadastroComponent,
    AdminConfiguracaoCupomDescontoComponent,
    AdminConfiguracaoCupomDescontoCadastroComponent,
    AdminDashboardPesoComponent,
    AdminDashboardPedidoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    AdminRoutingModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    HttpClientModule,
    NgbModule,
    SharedModule,
    FullCalendarModule,
    ChartsModule,
    BsDropdownModule.forRoot(),
    TagInputModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    DatePipe,
    ThemeService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class AdminModule { }

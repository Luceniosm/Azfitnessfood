import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-cliente-pacote',
  templateUrl: './cliente-pacote.component.html',
  styleUrls: ['./cliente-pacote.component.css'],
})

export class ClientePacoteComponent implements OnInit, AfterViewInit {
  tabAtiva = 'comprar';
  lgVoltarCadastro = false;
  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  nomeCliente: string;
  constructor(
    private router: Router,
    public rotaAtual: ActivatedRoute,
    private cookieService: CookieService
  ) {

  }

  ngOnInit(): void {
    this.nomeCliente = this.loadNomeCliente();
   }

  ngAfterViewInit() {
    setTimeout(() => {
      const tab = this.staticTabs.tabs.find(_ => this.router.url.includes(_.id));
      tab.active = true;
    });
  }

  loadUserId(): string {
    return (this.cookieService.get('admin') !== undefined && this.cookieService.get('admin') !== '') ?
      this.cookieService.get('admin') : '';
  }

  loadNomeCliente(): string {
    return (this.cookieService.get('nomeCliente') !== undefined && this.cookieService.get('nomeCliente') !== '') ?
      this.cookieService.get('nomeCliente') : '';
  }

  setaTabAtiva(tab: any) {
    this.nomeCliente = this.loadNomeCliente();
    const userId = this.loadUserId();
    const link = tab.id;
    this.router.navigate([`./cliente/pacote/${link}/${userId}`]);
  }

  carregarTabAtiva(obj: any) {
    if (obj && obj.tabName) {
      this.tabAtiva = obj.tabName;
    } else {
      this.tabAtiva = 'status';
    }

    if (obj.checkOtherUser()) {
      this.lgVoltarCadastro = true;
    }
  }
  voltarCadastroAdmin() {
    this.router.navigate([`./admin/clientes`]);
    this.cookieService.deleteAll();
  }
}

import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { DasboardPrincipal } from './admin-principal-model/admin-principal-dashboard.model';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-principal',
  templateUrl: './admin-principal.component.html',
  styleUrls: ['./admin-principal.component.css']
})
export class AdminPrincipalComponent implements OnInit {
  dataHoje: Date;
  dashboardPrincipal: DasboardPrincipal;
  versao = environment.appVersion;

  constructor(
    private adminService: AdminService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.inicializarDashboard();
    this.carregaDashboardAdminPrincipal();
    this.clearCookies();
  }
  clearCookies() {
    this.cookieService.deleteAll();
  }

  inicializarDashboard() {
    this.dashboardPrincipal = {
      clientesAtivosEmPacote: 0,
      clientesPacotesSuspenso: 0,
      clientesAvulsos: 0,
      pedidosConfirmados: 0
    };
  }
  carregaDashboardAdminPrincipal() {
    this.adminService.carregaDashboardAdminPrincipal()
      .subscribe((result) => {
        if (result.success) {
          this.dashboardPrincipal = <DasboardPrincipal>result.data;
        }
      });
  }
}

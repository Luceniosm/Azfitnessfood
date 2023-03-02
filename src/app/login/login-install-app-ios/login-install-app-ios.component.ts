import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-install-app-ios',
  templateUrl: './login-install-app-ios.component.html',
  styleUrls: ['./login-install-app-ios.component.css'],
  providers: [CookieService]
})
export class LoginInstallAppIosComponent implements OnInit {
  isIos = false;

  constructor(
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    if (this.cookieService.get('hiderBannerInstall') !== undefined &&
      this.cookieService.get('hiderBannerInstall') !== '') {
      return;
    }
    const userAgent = navigator.userAgent;
    if ((userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) &&
      !window.matchMedia('(display-mode: standalone)').matches
    ) {
      this.isIos = true;
    }
  }

  fecharOpcaoInstall(): void {
    this.isIos = false;
  }

  nuncaMais(): void {
    this.cookieService.set('hiderBannerInstall', '365');
    this.isIos = false;
  }
}

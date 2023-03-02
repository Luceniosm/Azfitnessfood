import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  returnUrl: string;
  error = '';
  private formSubmitAttempt: boolean;
  hide = true;
  environmentName = '';
  environmentProduction = true;
  environmentApi = '';
  versao = environment.appVersion;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private cookie: CookieService
  ) {
    this.environmentName = environment.name;
    this.environmentProduction = environment.production;
    this.environmentApi = environment.apiBaseUrl;
  }

  ngOnInit() {
    this.formLogin = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
      lembrar: [false]
    });
    this.authenticationService.logout();
    document.body.removeAttribute('class');
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.preencherLembrar();
  }
  preencherLembrar() {
    if (this.cookie.check('lembrar')) {
      this.formLogin.get('login').setValue(this.cookie.get('login'));
      this.formLogin.get('password').setValue(this.cookie.get('password'));
      this.formLogin.get('lembrar').setValue(true);
    }
  }

  get f() { return this.formLogin.controls; }

  isFieldInvalid(field: string) {
    return (
      (!this.formLogin.get(field).valid && this.formLogin.get(field).touched) ||
      (this.formLogin.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.formLogin.valid) {
      if (this.f.lembrar.value) {
        this.cookie.set('lembrar', this.f.lembrar.value);
        this.cookie.set('login', this.f.login.value);
        this.cookie.set('password', this.f.password.value);
      }

      this.authenticationService.login(this.f.login.value, this.f.password.value)
           .subscribe(el => console.log('Login realizado com sucesso!!'));

    }
    this.formSubmitAttempt = true;
  }

  lembrar(checked: boolean) {
    if (!checked) {
      this.cookie.delete('lembrar');
      this.cookie.delete('login');
      this.cookie.delete('password');
    }
  }

}


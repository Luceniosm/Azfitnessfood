import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { CustomValidation } from '../../utils/app.custom-validators';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login-cadastro',
  templateUrl: './login-cadastro.component.html',
  styleUrls: ['./login-cadastro.component.css']
})
export class LoginCadastroComponent implements OnInit {
  loginCadastroForm: FormGroup;
  private formValid: false;
  hide = true;
  hide2 = true;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
    ) { }

  ngOnInit() {
    this.loginCadastroForm = this.formBuilder.group({
      id: [ '' ],
      nome: ['', [Validators.required]],
      cpfCnpj: ['', [Validators.required, Validators.minLength(11)]],
      dtNascimento: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required]],
      password: ['', [Validators.required,  Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: CustomValidation.ConfirmPassword
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.loginCadastroForm.get(field).valid && this.loginCadastroForm.get(field).touched) ||
      (this.loginCadastroForm.get(field).untouched && this.formValid)
    );
  }

  confirmar() {
    const data = this.loginCadastroForm.value;
    data.dtNascimento = moment(data.dtNascimento, 'DD/MM/YYYY').format('YYYY-MM-DD');
    this.loginService.loginCadastro(this.loginCadastroForm.value)
        .subscribe((result) => {
          if (result.success) {
            this.router.navigate(['login/loginCadastroSucesso']);
           }
        });
  }

}

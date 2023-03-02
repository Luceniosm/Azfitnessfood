import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidation } from 'src/app/utils/app.custom-validators';
import { LoginService } from '../login.service';
import { AuthModel } from 'src/app/models/authentication/auth.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-trocar-senha',
  templateUrl: './login-trocar-senha.component.html',
  styleUrls: ['./login-trocar-senha.component.css']
})
export class LoginTrocarSenhaComponent implements OnInit {
  loginTrocarSenhaForm: FormGroup;
  private formValid: boolean;
  hide = true;
  hideOld = true;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.inicializarForm();
  }

  inicializarForm() {
    this.loginTrocarSenhaForm = this.formBuilder.group({
      email: [(JSON.parse(localStorage.getItem('currentUser')) as AuthModel).user.email],
      currentPassword : ['', [Validators.required,  Validators.minLength(6)]],
      password: ['', [Validators.required,  Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: CustomValidation.ConfirmPassword
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.loginTrocarSenhaForm.get(field).valid && this.loginTrocarSenhaForm.get(field).touched) ||
      (this.loginTrocarSenhaForm.get(field).untouched && this.formValid)
    );
  }

  alterarSenha() {
    this.loginService.loginTrocarSenha(this.loginTrocarSenhaForm.value)
        .subscribe(
          result => {
            this.toastr.success('Senha alterada com sucesso!');
            this.inicializarForm();
          }
        );
  }
}

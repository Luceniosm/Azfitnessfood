import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from '../login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-esqueceu',
  templateUrl: './login-esqueceu.component.html',
  styleUrls: ['./login-esqueceu.component.css']
})
export class LoginEsqueceuComponent implements OnInit {
  loginEsqueceuForm: FormGroup;
  private formValid: boolean;
  hideForm = true;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private toastr: ToastrService,
    ) { }

  ngOnInit() {
    this.loginEsqueceuForm = this.formBuilder.group({
      email: ['',  [Validators.required, Validators.email]]
    });
  }


  isFieldInvalid(field: string) {
    return (
      (!this.loginEsqueceuForm.get(field).valid && this.loginEsqueceuForm.get(field).touched) ||
      (this.loginEsqueceuForm.get(field).untouched && this.formValid)
    );
  }

  confirmar() {
    this.loginService
    .loginEsqueceu(this.loginEsqueceuForm.value.email)
    .subscribe(
      result => {
          this.hideForm = false;
        });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthModel } from 'src/app/models/authentication/auth.model';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-meu-perfil',
  templateUrl: './meu-perfil.component.html',
  styleUrls: ['./meu-perfil.component.css']
})
export class MeuPerfilComponent implements OnInit {
  meuPerfilForm: FormGroup;
  private formValid: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.meuPerfilForm = this.formBuilder.group({
      id: [''],
      nome: ['', [Validators.required]],
      cpfCnpj: [''],
      dataNascimento: ['', [Validators.required]],
      email: [''],
      celular: ['', [Validators.required]],
      idIdentityUser: []
    });
    this.meuPerfil((JSON.parse(localStorage.getItem('currentUser')) as AuthModel).user);
  }
  isFieldInvalid(field: string) {
    return (
      (!this.meuPerfilForm.get(field).valid && this.meuPerfilForm.get(field).touched) ||
      (this.meuPerfilForm.get(field).untouched && this.formValid)
    );
  }

  meuPerfil(result) {
    this.meuPerfilForm.setValue({
      id: result.idUsuario,
      nome: result.nome,
      cpfCnpj: result.cpfCnpj,
      dataNascimento: new Date(result.dtNascimento).toISOString().slice(0, 10),
      email: result.email,
      celular: result.celular,
      idIdentityUser: result.idIdentityUser
    });
  }

  atualizarPerfil() {
    this.sharedService
      .MeuPerfilAtualizar(this.meuPerfilForm.value)
      .subscribe((result) => {
        if (result.success) {
          const data = result.data;
          const authModel = (JSON.parse(localStorage.getItem('currentUser')) as AuthModel);
          authModel.user.nome = data.nome;
          authModel.user.dtNascimento = new Date(data.dtNascimento);
          authModel.user.celular = data.celular;
          localStorage.setItem('currentUser', JSON.stringify(authModel));
          this.toastr.success('Perfil atualizado com sucesso!');
        }
      });
  }

}

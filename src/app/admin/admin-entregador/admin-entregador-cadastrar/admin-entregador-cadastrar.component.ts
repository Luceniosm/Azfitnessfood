import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthModel } from 'src/app/models/authentication/auth.model';
import { UserModel } from 'src/app/models/authentication/user.model';
import { Entregador } from '../admin-entregador-model/admin-entregador.model';
import { AdminServiceEntregador } from '../admin-entregador.service';

@Component({
  selector: 'app-admin-entregador-cadastrar',
  templateUrl: './admin-entregador-cadastrar.component.html',
  styleUrls: ['./admin-entregador-cadastrar.component.css']
})

export class AdminEntregadorCadastrarComponent implements OnInit {

  form: FormGroup;
  model: Entregador;
  usuarioLogado: UserModel;
  entregadorId: string;
  edicao: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private adminServiceEntregador: AdminServiceEntregador,
    private toastr: ToastrService,
    private router: Router,
    public rotaAtual: ActivatedRoute,
    private datepipe: DatePipe
  ) { }

  ngOnInit() {
    this.buildForm();
    this.getUsuarioLogado();
    this.preencheParametros();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      idEntregador: [''],
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      dtNascimento: ['', Validators.required],
      placa: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', Validators.required],
      password: ['123@az', Validators.required]
    });
  }

  preencheParametros() {
    this.edicao = this.rotaAtual.routeConfig.path === 'edicao/:id';
    if (this.edicao) {
      this.rotaAtual.params.subscribe(async (params: Params) => {
        this.entregadorId = params['id'];
        this.buscarEntreagdor();
      });
    }
  }

  buscarEntreagdor() {
    if (this.entregadorId) {
      this.adminServiceEntregador.consultarEntregadorById(this.entregadorId).subscribe(_ => {
        if (_.success) {
          this.model = _.data;
          this.carregaModelo();
        }
      });
    }
  }

  salvar() {
    this.validarTodosCampos(this.form);

    if (this.form.valid) {
      if (!this.edicao) {
        this.instanciarModeloCadastro();
      } else { this.instanciarModeloEdicao(); }
    }
  }

  public validarTodosCampos(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty();
      }
    });
  }

  cadastrar() {
    this.adminServiceEntregador.cadastrarEntregador(this.model).subscribe(_ => {
      if (_.success) {
        this.toastr.success('Entregador cadastrado com sucesso!');
        this.voltar();
      }
    });
  }

  editar() {
    this.adminServiceEntregador.alterarEntregador(this.model).subscribe(_ => {
      if (_.success) {
        this.toastr.success('Entregador alterado com sucesso!');
        this.voltar();
      }
    });
  }

  instanciarModeloCadastro() {
    this.model = new Entregador();
    this.model.nome = this.form.get('nome').value;
    this.model.cpf = this.form.get('cpf').value;
    this.model.dtNascimento = this.form.get('dtNascimento').value;
    this.model.placa = this.form.get('placa').value;
    this.model.telefone = this.form.get('telefone').value;
    this.model.email = this.form.get('email').value;
    this.model.password = this.form.get('password').value;
    this.model.idUsuarioInclusao = this.usuarioLogado.idUsuario;
    this.cadastrar();
  }

  instanciarModeloEdicao() {
    this.model.nome = this.form.get('nome').value;
    this.model.cpf = this.form.get('cpf').value;
    this.model.dtNascimento = this.form.get('dtNascimento').value;
    this.model.placa = this.form.get('placa').value;
    this.model.telefone = this.form.get('telefone').value;
    this.model.email = this.form.get('email').value;
    this.model.idUsuarioInclusao = this.usuarioLogado.idUsuario;
    this.editar();
  }

  carregaModelo() {
    this.form.get('nome').setValue(this.model.nome);
    this.form.get('cpf').setValue(this.model.cpf);
    this.form.get('dtNascimento').setValue(this.datepipe.transform(this.model.dtNascimento, 'yyyy-MM-dd'));
    this.form.get('placa').setValue(this.model.placa);
    this.form.get('telefone').setValue(this.model.telefone);
    this.form.get('email').setValue(this.model.email.replace('@azfitnessfood.com.br', ''));

    this.form.get('idEntregador').setValue(this.model.idEntregador);
  }

  getUsuarioLogado() {
    this.usuarioLogado = (JSON.parse(localStorage.getItem('currentUser')) as AuthModel).user;
  }

  voltar() {
    this.router.navigate(['admin/entregador']);
  }

  isValid(input) {
    return (input.invalid || !input.valid) && (input.dirty || input.touched);
  }
}

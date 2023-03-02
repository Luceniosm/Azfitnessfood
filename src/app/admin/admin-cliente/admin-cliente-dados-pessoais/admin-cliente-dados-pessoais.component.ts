import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { ToastrService } from 'ngx-toastr';
import { ClienteCadastro } from '../admin-cliente-model/admin-cliente-cadastro.model';
import { AdminClienteService } from '../admin-cliente.service';

@Component({
  selector: 'app-admin-cliente-dados-pessoais',
  templateUrl: './admin-cliente-dados-pessoais.component.html',
  styleUrls: ['./admin-cliente-dados-pessoais.component.css']
})
export class AdminClienteDadosPessoaisComponent implements OnInit {
  cadastroForm: FormGroup;
  edicao: boolean;
  clienteId: string;

  constructor(
    private formBuilder: FormBuilder,
    private adminCliente: AdminClienteService,
    private toastr: ToastrService,
    private router: Router,
    public rotaAtual: ActivatedRoute,
    private datepipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.preencheParametros();
  }

  initForm(): void {
    this.cadastroForm = this.formBuilder.group({
      idUsuario: [Guid.createEmpty().toString()],
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', Validators.required],
      dtNascimento: ['', Validators.required],
      cpfCnpj: ['', Validators.required]
    });
  }

  voltar() {
    this.router.navigate(['admin/clientes']);
  }

  salvar(): void {
    if (!this.edicao) {
      this.adminCliente.cadastrarUsuarioAdmin(this.cadastroForm.getRawValue()).subscribe(_ => {
        if (_.success) {
          this.toastr.success('Cadastro realizado com sucesso');
          const cliente = <ClienteCadastro>_.data;
          this.buildForm(cliente);
        } else {
          this.toastr.error(_.errors);
        }
      });
    } else {
      this.adminCliente.atualizarClienteAdmin(this.cadastroForm.getRawValue()).subscribe(_ => {
        if (_.success) {
          this.toastr.success('Atualização realizado com sucesso');
          const cliente = <ClienteCadastro>_.data;
          this.buildForm(cliente);
        } else {
          this.toastr.error(_.errors);
        }
      });
    }
  }

  preencheParametros() {
    this.edicao = this.rotaAtual.routeConfig.path === 'edicao/:id';
    if (this.edicao) {
      this.rotaAtual.params.subscribe(async (params: Params) => {
        this.clienteId = params['id'];
        this.carregarDados();
      });
    }
  }

  carregarDados() {
    this.adminCliente.consultarCliente(this.clienteId)
      .subscribe((result) => {
        if (result.success) {
          const cliente = <ClienteCadastro>result.data;
          this.buildForm(cliente);
        }
      });
  }

  buildForm(data: ClienteCadastro): void {
    this.cadastroForm.patchValue({
      idUsuario: data.idUsuario,
      nome: data.nome,
      telefone: data.telefone || data.celular,
      email: data.email,
      dtNascimento: this.datepipe.transform(data.dtNascimento, 'yyyy-MM-dd'),
      cpfCnpj: data.cpfCnpj
    });
  }

  resetPassword(): void {
     this.adminCliente.loginEsqueceu(this.cadastroForm.get('email').value).subscribe(_ => {
        if (_.success) {
          this.toastr.success('Senha restada com sucesso!');
          this.toastr.info('Senha padrão: az@123456');
        } else {
          this.toastr.error(_.errors);
        }
      });
  }
}

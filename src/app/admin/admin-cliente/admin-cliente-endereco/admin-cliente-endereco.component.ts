import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Guid } from 'guid-typescript';
import { ToastrService } from 'ngx-toastr';
import { ClienteEnderecoService } from 'src/app/cliente/cliente-endereco/cliente-endereco.service';
import { AuthModel } from 'src/app/models/authentication/auth.model';
import { ClienteEndereco } from '../admin-cliente-model/admin-cliente-endereco.model';
import { AdminClienteService } from '../admin-cliente.service';

@Component({
  selector: 'app-admin-cliente-endereco',
  templateUrl: './admin-cliente-endereco.component.html',
  styleUrls: ['./admin-cliente-endereco.component.css']
})
export class AdminClienteEnderecoComponent implements OnInit {
  contadorDelistagem = 1;
  enderecoForm: FormGroup;
  enderecos: Array<ClienteEndereco>;
  visualizarListagem = true;
  idUsuario: string;
  constructor(
    private clienteEnderecoService: ClienteEnderecoService,
    private adminClienteService: AdminClienteService,
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private currentRouter: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.initForm();
    this.listarEnderecos();
  }

  listarEnderecos() {
    if (this.currentRouter.routeConfig.path !== 'cadastro') {
      this.currentRouter.params.subscribe(async (params: Params) => {
        this.idUsuario = params['id'];
        this.clienteEnderecoService.clienteListEndereco(params['id']).subscribe(_ => {
          if (_.success) {
            this.enderecos = _.data;
          }
        });
      });
    }
  }

  initForm(): void {
    this.enderecoForm = this.formBuilder.group({
      idUsuarioEndereco: [Guid.createEmpty().toString()],
      descricao: ['', Validators.required],
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      complemento: [''],
      numero: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: [''],
      uf: [''],
      pontoReferencia: [''],
      lgPrincipal: [false],
      idUsuario: []
    });
  }

  consultaCep() {
    this.clienteEnderecoService.consultaCep(this.enderecoForm.get('cep').value).subscribe(_ => {
      if (_.success) {
        this.enderecoForm.patchValue({
          logradouro: _.data.logradouro,
          complemento: _.data.complemento,
          bairro: _.data.bairro,
          cidade: _.data.cidade,
          uf: _.data.uf
        });
        this.renderer.selectRootElement('#numero').focus();
      }
    });
  }

  isValid(input) {
    return (input.invalid || !input.valid) && (input.dirty || input.touched);
  }

  novo(): void {
    this.visualizarListagem = false;
    this.initForm();
  }

  salvar(): void {
    if (this.enderecoForm.get('idUsuarioEndereco').value === Guid.createEmpty().toString()) {
      this.enderecoForm.get('idUsuario').setValue(this.idUsuario);
      this.adminClienteService.cadastroEndereco(this.enderecoForm.getRawValue()).subscribe(_ => {
        if (_.data) {
          this.toastr.success('Cadastrdo realizado com sucesso!');
          this.visualizarListagem = true;
          this.enderecos.push(_.data);
        } else {
          this.toastr.error('Error ao cadastrar usuario!');
        }
      });
    } else {
      this.adminClienteService.atualizarEndereco(this.enderecoForm.getRawValue()).subscribe(_ => {
        if (_.data) {
          this.toastr.success('Atualização realizado com sucesso!');
          this.visualizarListagem = true;
          this.listarEnderecos();
        } else {
          this.toastr.error('Error ao atualizar endereço!');
        }
      });
    }
  }

  editar(item: ClienteEndereco): void {
    this.enderecoForm.patchValue({
      idUsuarioEndereco: item.idUsuarioEndereco,
      descricao: item.descricao,
      cep: item.cep,
      logradouro: item.logradouro,
      complemento: item.complemento,
      numero: item.numero,
      bairro: item.bairro,
      cidade: item.cidade,
      uf: item.uf,
      lgPrincipal: item.lgPrincipal,
      idUsuario: (JSON.parse(localStorage.getItem('currentUser')) as AuthModel).user.idUsuario.toString()
    });
    this.visualizarListagem = false;
  }
  voltar() {
    this.visualizarListagem = true;
  }
  excluir(idEndereco: string): void {
    const endereco = this.enderecos.find(_ => _.idUsuarioEndereco === idEndereco);
    if (endereco.lgPrincipal) {
      this.toastr.warning('Não é possivel excluir um endereço principal!');
    } else {
      this.adminClienteService.removeEndereco(idEndereco).subscribe(_ => {
        if (_.data) {
          this.toastr.success('Excluido com sucesso!');
          this.enderecos = this.enderecos.filter(end => {
            return end.idUsuarioEndereco !== idEndereco;
          });
        } else {
          this.toastr.error('Error ao excluir endereço!');
        }
      });

    }
  }
}

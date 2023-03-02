import { Component, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';
import { ClienteEndereco } from 'src/app/admin/admin-cliente/admin-cliente-model/admin-cliente-endereco.model';
import { AuthModel } from 'src/app/models/authentication/auth.model';
import { ClienteEnderecoService } from '../cliente-endereco.service';



@Component({
  selector: 'app-cliente-endereco-cadastro',
  templateUrl: './cliente-endereco-cadastro.component.html',
  styleUrls: ['./cliente-endereco-cadastro.component.css']
})

export class ClienteEnderecoCadastroComponent implements OnInit {
  idCurrentUser = (JSON.parse(localStorage.getItem('currentUser')) as AuthModel).user.idUsuario;
  rota = JSON.parse(localStorage.getItem('rota'));
  enderecoCadastroForm: FormGroup;
  submited: boolean;
  private formValid: boolean;
  endereco: ClienteEndereco;
  @Output() voltarEmit = new EventEmitter();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private clienteEnderecoService: ClienteEnderecoService,
    private toastr: ToastrService,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras?.state) {
        this.endereco = this.router.getCurrentNavigation().extras.state.endereco;
      }
    });
  }

  ngOnInit() {
    this.initForm();
    this.toastr.clear();
    this.submited = false;
    this.renderer.selectRootElement('#descricao').focus();
    this.carregarEndereco();
  }

  initForm(): void {
    this.enderecoCadastroForm = this.formBuilder.group({
      idUsuarioEndereco: [Guid.createEmpty().toString()],
      idUsuario: this.clienteContratacaoPacote(),
      dataInclusao: (moment().format('YYYY-MM-DD HH:mm:ss')),
      descricao: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      logradouro: [{ value: '', disabled: true }, [Validators.required]],
      numero: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(4), Validators.minLength(1)]],
      complemento: [{ value: '', disabled: true }],
      bairro: [{ value: '', disabled: true }, [Validators.required]],
      cidade: [{ value: '', disabled: true }, [Validators.required]],
      uf: [{ value: '', disabled: true }, [Validators.required]],
      pontoReferencia: [{ value: '', disabled: true }],
      btncep: [{ disabled: true }],
    });
  }

  carregarEndereco() {
    if (this.endereco === undefined) {
      return;
    }

    this.enderecoCadastroForm.patchValue({
      idUsuarioEndereco: this.endereco.idUsuarioEndereco,
      idUsuario: this.clienteContratacaoPacote(),
      dataInclusao: (moment().format('YYYY-MM-DD HH:mm:ss')),
      descricao: this.endereco.descricao,
      cep: this.endereco.cep,
      logradouro: this.endereco.logradouro,
      numero: this.endereco.numero,
      complemento: this.endereco.complemento,
      bairro: this.endereco.bairro,
      cidade: this.endereco.cidade,
      uf: this.endereco.uf
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.enderecoCadastroForm.get(field).valid && this.enderecoCadastroForm.get(field).touched) ||
      (this.enderecoCadastroForm.get(field).untouched && this.formValid)
    );
  }

  consultaCep(cep: string) {
    this.clienteEnderecoService.consultaCep(cep).subscribe(_ => {
      if (_.success) {
        this.enderecoCadastroForm.patchValue({
          logradouro: _.data.logradouro,
          complemento: _.data.complemento,
          bairro: _.data.bairro,
          cidade: _.data.cidade,
          uf: _.data.uf
        });

        this.enderecoCadastroForm.get('numero').enable();
        this.enderecoCadastroForm.get('complemento').enable();
        this.enderecoCadastroForm.get('pontoReferencia').enable();

        this.enderecoCadastroForm.get('logradouro').disable();
        this.enderecoCadastroForm.get('bairro').disable();
        this.enderecoCadastroForm.get('cidade').disable();
        this.enderecoCadastroForm.get('uf').disable();
        this.renderer.selectRootElement('#numero').focus();
      }
    },
      error => {
        this.enderecoCadastroForm.get('logradouro').setValue('');
        this.enderecoCadastroForm.get('numero').setValue('');
        this.enderecoCadastroForm.get('bairro').setValue('');
        this.enderecoCadastroForm.get('cidade').setValue('');
        this.enderecoCadastroForm.get('uf').setValue('');
        this.enderecoCadastroForm.get('complemento').setValue('');
        this.enderecoCadastroForm.get('pontoReferencia').setValue('');

        this.enderecoCadastroForm.get('logradouro').enable();
        this.enderecoCadastroForm.get('numero').enable();
        this.enderecoCadastroForm.get('bairro').enable();
        this.enderecoCadastroForm.get('cidade').enable();
        this.enderecoCadastroForm.get('uf').enable();
        this.enderecoCadastroForm.get('complemento').enable();
        this.enderecoCadastroForm.get('pontoReferencia').enable();
        this.toastr.error('Endereço não encontrado, tente novamente mais tarde.');
      });
  }

  submit() {
    this.submited = true;
    if (this.endereco?.idUsuarioEndereco) {
      this.clienteEnderecoService.atualizarEndereco(this.enderecoCadastroForm.getRawValue()).subscribe(result => {
        if (result.data) {
          this.router.navigate(['/cliente/endereco']);
          this.toastr.success('Endereço Cadastrado com Sucesso!');
        } else {
          this.submited = false;
          this.toastr.error('Desculpe não foi possível salvar o endereço informado, por favor tente novamente.');
        }
      });
    } else {
      this.clienteEnderecoService.cadastroEndereco(this.enderecoCadastroForm.getRawValue())
        .pipe(switchMap((result) => {
          if (result.data) {
            const cliente = (JSON.parse(localStorage.getItem('currentUser')) as AuthModel);
            cliente.user.enderecos.push(result.data);
            localStorage.setItem('currentUser', JSON.stringify(cliente));
          }
          return this.clienteEnderecoService.alteraLocalPadraoEntrega(result.data.idUsuarioEndereco).pipe();
        }))
        .subscribe(_ => {
          if (_.success) {
            if (this.rota) {
              this.router.navigate([this.rota]);
              localStorage.removeItem('rota');
            } else if (this.router.url === '/cliente/menu') {
              this.voltarEmit.emit();
              this.toastr.success('Endereço Cadastrado com Sucesso!');
            } else {
              this.router.navigate(['/cliente/endereco']);
              this.toastr.success('Endereço Cadastrado com Sucesso!');
            }
          } else {
            this.submited = false;
            this.toastr.error('Desculpe não foi possível salvar o endereço informado, por favor tente novamente.');
          }
        });
    }
  }

  voltar(): void {
    if (this.rota) {
      this.router.navigate([this.rota]);
      localStorage.removeItem('rota');
    } else if (this.router.url === '/cliente/menu') {
      this.voltarEmit.emit();
    } else {
      this.router.navigate(['/cliente/endereco']);
    }
  }

  clienteContratacaoPacote(): string {
    return (this.cookieService.get('admin') !== undefined && this.cookieService.get('admin') !== '') ?
      this.cookieService.get('admin') : this.idCurrentUser;
  }
}

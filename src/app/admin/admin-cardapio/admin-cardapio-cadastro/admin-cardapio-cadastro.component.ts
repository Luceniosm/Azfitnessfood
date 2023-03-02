import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import * as moment from 'moment';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { AdminCardapioModel } from 'src/app/admin/admin-cardapio/admin-cardapio-model/admin-cardapio.model';
import { AdminCardapioService } from 'src/app/admin/admin-cardapio/admin-cardapio.service';
import { AuthModel } from 'src/app/models/authentication/auth.model';
import { UserModel } from 'src/app/models/authentication/user.model';
import { BalaoConfirmacaoService } from 'src/app/shared/balao-confirmacao/balao-confirmacao.service';
import { Util } from 'src/app/utils/util';


@Component({
  selector: 'app-admin-cardapio-cadastro',
  templateUrl: './admin-cardapio-cadastro.component.html',
  styleUrls: ['./admin-cardapio-cadastro.component.css']
})

export class AdminCardapioCadastroComponent implements OnInit {
  usuarioLogado: UserModel;
  model: AdminCardapioModel;
  cardapioCadastroForm: FormGroup;
  items = ['carne'];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private currentRouter: ActivatedRoute,
    private adminCardapioService: AdminCardapioService,
    private localeService: BsLocaleService,
    private datepipe: DatePipe,
    private balaoConfirmacaoService: BalaoConfirmacaoService
  ) {
    this.localeService.use('pt-br');
  }

  ngOnInit() {
    this.initForm();
    this.getUsuarioLogado();
    this.preencheParametros();
  }

  initForm(): void {
    this.cardapioCadastroForm = this.formBuilder.group({
      id: [Guid.createEmpty().toString()],
      opcoes: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      dataPedido: ['', [Validators.required]],
      arquivos: ['', [Validators.required]],
      imagens: this.formBuilder.array([], [Validators.required]),
      ativo: true,
      tags: [''],
      ordem: ['', [Validators.required]],
    });
  }

  preencheParametros(): void {
    if (this.currentRouter.routeConfig.path !== 'cadastro') {
      this.currentRouter.params.subscribe(async (params: Params) => {
        this.adminCardapioService.consultaCardapioById(params['id']).subscribe(_ => {
          if (_.success) {
            this.model = _.data;
            if (this.currentRouter.routeConfig.path === 'copiar') {
              this.model.idCardapio = Guid.createEmpty().toString();
            }
            this.fillFormModel();
          }
        });
      });
    }
  }

  onChange(event: any, input: any) {
    const files = [].slice.call(event.target.files);
    files.map((file: File) => this.getFile(file).then((data) => {
      const itemImagens = <FormArray>this.cardapioCadastroForm.get('imagens');
      itemImagens.push(new FormControl(data));
      this.adjustTextNameFiles();
    }));
    input.value = null;
  }

  getFile(file: File): Promise<any> {
    if ((file.size / 203724) > 1) {
      this.toastr.warning(`Arquivo ${file.name} excede o tamanho permitido de 200Kb`);
      return null;
    }
    return Util.getFile(file);
  }

  getUsuarioLogado() {
    this.usuarioLogado = (JSON.parse(localStorage.getItem('currentUser')) as AuthModel).user;
  }

  salvar() {
    this.fillModel();
    if (moment(this.model.dataPedido).isSameOrAfter(moment(), 'days')) {
      const action = this.currentRouter.routeConfig.path.split('/')[0];
      if (action === 'copiar') {
        this.model.idCardapio = Guid.createEmpty().toString();
      }

      switch (action) {
        case 'cadastro':
          this.cadastar();
          break;
        case 'copiar':
          this.copiar();
          break;
        case 'edicao':
          this.editar();
          break;
      }

    } else {
      this.toastr.warning('A data do pedido não poderá ser menor que a data Atual ');
    }

  }

  cadastar() {
    this.adminCardapioService.salvaCardapio(this.model).subscribe(_ => {
      if (_.success) {
        this.toastr.success('Cardápio Cadastrado com Sucesso!');
        this.initForm();
      }
    });
  }

  copiar() {
    this.adminCardapioService.salvaCardapio(this.model).subscribe(_ => {
      if (_.success) {
        this.toastr.success('Cardápio Copiado com Sucesso!');
        this.initForm();
        this.voltar();
      }
    });
  }

  editar() {
    this.adminCardapioService.alteraCardapio(this.model).subscribe(_ => {
      if (_.success) {
        this.toastr.success('Cardápio Editado com Sucesso!');
        this.initForm();
        this.voltar();
      }
    });
  }

  voltar() {
    this.router.navigate(['admin/cardapio']);
  }

  fillModel() {
    this.model = new AdminCardapioModel();
    this.model.idCardapio = this.cardapioCadastroForm.get('id').value;
    this.model.titulo = this.cardapioCadastroForm.get('opcoes').value;
    this.model.dataPedido = this.cardapioCadastroForm.get('dataPedido').value;
    this.model.lgAtivo = (<HTMLInputElement>document.getElementById('ativo')).checked;
    this.model.descricao = this.cardapioCadastroForm.get('descricao').value;
    this.model.cardapioImagens = this.cardapioCadastroForm.get('imagens').value;
    this.model.ordem = this.cardapioCadastroForm.get('ordem').value;
    this.model.tags = this.cardapioCadastroForm.get('tags').value;
  }

  fillFormModel() {
    this.cardapioCadastroForm.get('id').setValue(this.model.idCardapio);
    this.cardapioCadastroForm.get('opcoes').setValue(this.model.titulo);
    this.cardapioCadastroForm.get('descricao').setValue(this.model.descricao);
    this.cardapioCadastroForm.get('dataPedido').setValue(this.datepipe.transform(this.model.dataPedido, 'yyyy-MM-dd'));
    this.cardapioCadastroForm.get('ativo').setValue(this.model.lgAtivo);
    this.cardapioCadastroForm.get('ordem').setValue(this.model.ordem);
    this.cardapioCadastroForm.get('tags').setValue(this.model.tags);
    this.carregaImagemForm(this.model.cardapioImagens);
    this.adjustTextNameFiles();
  }

  confirmExcluir(idx: any) {
    this.balaoConfirmacaoService.confirm({
      message: 'Dejesa confirmar a EXCLUSÃO do cardápio selecionado?',
      btnOkText: 'Sim',
      btnCancelText: 'Não'
    }).subscribe((result) => result ? this.excluir(idx) : null);
  }

  excluir(idx: any) {
    const imagens = <FormArray>this.cardapioCadastroForm.get('imagens');
    imagens.removeAt(idx);
    this.adjustTextNameFiles();
  }

  adjustTextNameFiles(): any {
    const imagens = <FormArray>this.cardapioCadastroForm.get('imagens');
    this.cardapioCadastroForm.get('arquivos').setValue(imagens.controls.map((f => f.value.nome)).join('; '));
  }

  carregaImagemForm(models) {
    const imagens = <FormArray>this.cardapioCadastroForm.get('imagens');
    models.forEach(element => {
      imagens.push(new FormControl(element));
    });
  }

  isValid(input) {
    return (input.invalid || !input.valid) && (input.dirty || input.touched);
  }
}

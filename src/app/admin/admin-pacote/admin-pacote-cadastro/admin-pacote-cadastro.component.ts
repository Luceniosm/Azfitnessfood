import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Guid } from 'guid-typescript';
import { ToastrService } from 'ngx-toastr';
import { BalaoConfirmacaoService } from 'src/app/shared/balao-confirmacao/balao-confirmacao.service';
import { Util } from 'src/app/utils/util';
import { AdminPacoteCategoria } from '../admin-pacote-model/admin-pacote-categoria.model';
import { AdminTermoCondicao } from '../admin-pacote-model/admin-pacote-termo-condicao';
import { AdminPacoteTipoPacote } from '../admin-pacote-model/admin-pacote-tipo-pacote.model';
import { AdminPacoteService } from '../admin-pacote.service';

@Component({
  selector: 'app-admin-pacote-cadastro',
  templateUrl: './admin-pacote-cadastro.component.html',
  styleUrls: ['./admin-pacote-cadastro.component.css']
})
export class AdminPacoteCadastroComponent implements OnInit {
  pacoteForm: FormGroup;
  idPacote = Guid.createEmpty().toString();
  public editor = ClassicEditor;
  tiposPacote = Array<AdminPacoteTipoPacote>();
  termosCondicoes = Array<AdminTermoCondicao>();


  constructor(
    private adminPacoteService: AdminPacoteService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    public rotaAtual: ActivatedRoute,
    private balaoConfirmacaoService: BalaoConfirmacaoService
  ) { }

  ngOnInit() {
    this.buildForm();
    this.carregarTiposDoPacote();
    this.carregarTermoCondicao();
    this.preencheParametros();
  }

  buildForm(): void {
    this.pacoteForm = this.formBuilder.group({
      idPacote: [Guid.createEmpty().toString()],
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      observacao: [''],
      quantidade: ['', Validators.required],
      diasConsumacao: ['', Validators.required],
      diasValidade: ['', Validators.required],
      taxaDeEntrega: [0],
      valorAdicional: [0],
      idTipoPacote: ['', Validators.required],
      idTermoCondicao: ['', Validators.required],
      lgAtivo: [true],
      imagemDoPacote: [''],
      categorias: [[]],
      lgEnviaNotificacao: [''],
      lgRenovacao: ['']
    });
  }

  carregarTiposDoPacote() {
    this.adminPacoteService.carregarTiposDoPacote()
      .subscribe((result) => {
        if (result.success) {
          this.tiposPacote = <Array<AdminPacoteTipoPacote>>result.data;
        }
      });
  }

  carregarTermoCondicao() {
    this.adminPacoteService.carregarTermoCondicao()
      .subscribe((result) => {
        if (result.success) {
          this.termosCondicoes = <Array<AdminTermoCondicao>>result.data;
        }
      });
  }
  preencheParametros(): void {
    if (this.rotaAtual.routeConfig.path === 'editar/:id') {
      this.rotaAtual.params.subscribe(async (params: Params) => {
        this.adminPacoteService.carregarPacote(params['id']).subscribe(_ => {
          if (_.success) {
            const data = _.data;
            this.idPacote = _.data.idPacote;
            this.preencherDadosEdicao(data);
          }
        });
      });
    } else if (this.rotaAtual.routeConfig.path === 'duplicar/:id') {
      this.rotaAtual.params.subscribe(async (params: Params) => {
        this.adminPacoteService.carregarPacote(params['id']).subscribe(_ => {
          if (_.success) {
            const data = _.data;
            let categorias = <Array<AdminPacoteCategoria>>data.categorias;
            categorias = categorias.map(__ =>
            ({
              ...__,
              idCategoriaDoPacote: Guid.createEmpty().toString(),
              idPacote: Guid.createEmpty().toString(),
              complementos: __.complementos.map(___ => ({
                ...___,
                idComplementoDaCategoria: Guid.createEmpty().toString(),
                idCategoriaDoPacote: Guid.createEmpty().toString(),
                itensDoComplemento: ___.itensDoComplemento.map(____ => ({
                  ...____,
                  idItemDoComplemento: Guid.createEmpty().toString(),
                  idComplementoDaCategoria: Guid.createEmpty().toString()
                }))
              }))
            }));
            this.idPacote = Guid.createEmpty().toString();
            data.categorias = categorias;
            this.preencherDadosEdicao(data);
          }
        });
      });
    }
  }

  preencherDadosEdicao(data: any): void {
    this.pacoteForm.patchValue({
      idPacote: this.idPacote,
      titulo: data.titulo,
      descricao: data.descricao,
      quantidade: data.quantidade,
      diasConsumacao: data.diasConsumacao,
      diasValidade: data.diasValidade,
      taxaDeEntrega: data.taxaDeEntrega,
      valorAdicional: data.valorAdicional,
      idTipoPacote: data.idTipoPacote,
      idTermoCondicao: data.idTermoCondicao,
      lgAtivo: data.lgAtivo,
      lgEnviaNotificacao: data.lgEnviaNotificacao,
      lgRenovacao: data.lgRenovacao,
      imagemDoPacote: data.imagemDoPacote,
      categorias: data.categorias
    });
  }

  onChange(event: any, input: any) {
    const files = [].slice.call(event.target.files);
    files.map((file: File) => this.loadImagem(file).then((data) => {
      this.pacoteForm.get('imagemDoPacote').setValue(data);
    }));
  }

  loadImagem(file: File): Promise<any> {
    if ((file.size / 101862) > 1) {
      this.toastr.warning(`Arquivo ${file.name} excede o tamanho permitido de 100Kb`);
      return null;
    }

    return Util.getFile(file);
  }

  voltar(): void {
    this.router.navigate(['admin/pacote']);
  }

  salvar(): void {
    if (this.idPacote === Guid.createEmpty().toString()) {
      this.adminPacoteService.cadastrarPacote(this.pacoteForm.getRawValue()).subscribe(_ => {
        if (_.success) {
          this.toastr.success('Cadastro realizado com sucesso');
          this.pacoteForm.get('idPacote').setValue(_.data.idPacote);
          this.idPacote = _.data.idPacote;
          this.preencherDadosEdicao(_.data);
        } else {
          this.toastr.error(_.errors);
        }
      });
    } else {
      this.adminPacoteService.atualizarPacote(this.pacoteForm.getRawValue()).subscribe(_ => {
        if (_.success) {
          this.toastr.success('Cadastro realizado com sucesso');
          this.pacoteForm.get('idPacote').setValue(_.data.idPacote);
          this.idPacote = _.data.idPacote;
          this.preencherDadosEdicao(_.data);
        } else {
          this.toastr.error(_.errors);
        }
      });
    }
  }

  atualizarCategorias(itens: any): void {
    this.pacoteForm.patchValue({
      categorias: itens
    });
  }
}


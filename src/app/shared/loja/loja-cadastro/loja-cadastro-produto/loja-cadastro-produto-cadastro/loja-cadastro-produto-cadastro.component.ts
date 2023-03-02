import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BalaoConfirmacaoService } from 'src/app/shared/balao-confirmacao/balao-confirmacao.service';
import { Categoria } from '../../loja-cadastro-categoria/loja-cadastro-categoria-model/loja-cadastro-categoria.model';
import { LojaCadastroProduto } from '../loja-cadastro-produto-model/loja-cadastro-produto.model';
import { ProdutoService } from '../loja-cadastro-produto.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Guid } from 'guid-typescript';
import { Util } from 'src/app/utils/util';

@Component({
  selector: 'app-loja-cadastro-produto-cadastro',
  templateUrl: './loja-cadastro-produto-cadastro.component.html',
  styleUrls: ['./loja-cadastro-produto-cadastro.component.css']
})
export class LojaCadastroProdutoCadastroComponent implements OnInit {
  produtoForm: FormGroup;
  categorias: Array<Categoria>;
  public editor = ClassicEditor;
  @Input() produto: LojaCadastroProduto;
  @Output() visualizarListagemEmit = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private toastr: ToastrService,
    private balaoConfirmacaoService: BalaoConfirmacaoService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.carregarCategoriasAtivas();
    this.edicao();
  }

  buildForm(): void {
    this.produtoForm = this.formBuilder.group({
      idProduto: [Guid.createEmpty().toString()],
      idCategoria: [Guid.createEmpty().toString()],
      titulo: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      sabor: ['', [Validators.required]],
      peso: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      quantidadeDisponivel: ['', [Validators.required]],
      arquivos: [''],
      imagens: this.formBuilder.array([], [Validators.required]),
      ativo: true
    });
  }

  carregarCategoriasAtivas(): void {
    this.produtoService.carregarCategoriasAtivas().subscribe(_ => {
      if (_.success) {
        this.categorias = _.data;
      }
    });
  }

  edicao(): void {
    if (this.produto) {
      this.produtoForm.patchValue({
        idProduto: this.produto.idProduto,
        idCategoria: this.produto.idCategoria,
        titulo: this.produto.titulo,
        descricao: this.produto.descricao,
        sabor: this.produto.sabor,
        peso: this.produto.peso,
        marca: this.produto.marca,
        valor: this.produto.valor,
        quantidadeDisponivel: this.produto.quantidadeDisponivel,
        imagens: this.carregaImagensForm(this.produto.imagens),
        ativo: this.produto.ativo
      });
    }
  }

  carregaImagensForm(models): void {
    const imagens = <FormArray>this.produtoForm.get('imagens');
    models.forEach(element => {
      imagens.push(new FormControl(element));
    });
  }

  voltar(): void {
    this.visualizarListagemEmit.emit();
  }

  cadastrar(): void {
    this.produtoService.cadastrarProduto(this.produtoForm.getRawValue()).subscribe(_ => {
      if (_.success) {
        this.toastr.success('Cadastro realizado com sucesso!');
        this.voltar();
      } else {
        this.toastr.error('Erro ao cadastrar o produto!');
      }
    });
  }


  confirmExcluir(idx: any) {
    this.balaoConfirmacaoService.confirm({
      message: 'Dejesa confirmar a EXCLUSÃO da imagem selecionada?',
      btnOkText: 'Sim',
      btnCancelText: 'Não'
    }).subscribe((result) => result ? this.excluir(idx) : null);
  }

  excluir(idx: any) {
    const imagens = <FormArray>this.produtoForm.get('imagens');
    imagens.removeAt(idx);
    this.adjustTextNameFiles();
  }

  adjustTextNameFiles(): any {
    const imagens = <FormArray>this.produtoForm.get('imagens');
    this.produtoForm.get('arquivos').setValue(imagens.controls.map((f => f.value.nome)).join('; '));
  }

  onChange(event: any, input: any) {
    const files = [].slice.call(event.target.files);
    files.map((file: File) => this.getFile(file).then((data) => {
      data.principal = false;
      const itemImagens = <FormArray>this.produtoForm.get('imagens');
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

}

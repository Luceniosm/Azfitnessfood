import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from '../loja-cadastro-categoria-model/loja-cadastro-categoria.model';
import { CategoriaService } from '../loja-cadastro-categoria.service';

@Component({
  selector: 'app-loja-cadastro-categoria-cadastro',
  templateUrl: './loja-cadastro-categoria-cadastro.component.html',
  styleUrls: ['./loja-cadastro-categoria-cadastro.component.css']
})
export class LojaCadastroCategoriaCadastroComponent implements OnInit {
  categoriaForm: FormGroup;
  @Input() categoria: Categoria;
  @Output() visualizarListagemEmit = new EventEmitter();
  constructor(
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.edicao();
  }

  buildForm(): void {
    this.categoriaForm = this.formBuilder.group({
      idCategoria: [Guid.createEmpty().toString()],
      descricao: ['', Validators.required],
      ativo: [true]
    });
  }

  edicao(): void {
    if (this.categoria) {
      this.categoriaForm.patchValue({
        idCategoria: this.categoria.idCategoria,
        descricao: this.categoria.descricao,
        ativo: this.categoria.ativo,
      });
    }
  }

  voltar(): void {
    this.visualizarListagemEmit.emit();
  }

  cadastrar(): void {
    this.categoriaService.cadastrarCategoria(this.categoriaForm.getRawValue()).subscribe(_ => {
      if (_.success) {
        this.toastr.success('Cadastro realizado com sucesso!');
        this.voltar();
      } else {
        this.toastr.error('Erro ao cadastrar categoria!');
      }
    });
  }

}

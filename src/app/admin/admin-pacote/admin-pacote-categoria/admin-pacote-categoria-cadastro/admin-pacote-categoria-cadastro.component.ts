import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { AdminPacoteService } from '../../admin-pacote.service';
import { AdminPacoteCategoriaComplementoComponent } from '../admin-pacote-categoria-complemento/admin-pacote-categoria-complemento.component';

@Component({
  selector: 'app-admin-pacote-categoria-cadastro',
  templateUrl: './admin-pacote-categoria-cadastro.component.html',
  styleUrls: ['./admin-pacote-categoria-cadastro.component.css']
})
export class AdminPacoteCategoriaCadastroComponent implements OnInit {
  complementoListagem = 1;
  categoriaForm: FormGroup;
  mostrarListagemComplemento = false;
  complementoEdit: any;
  ordens = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  @Input() idPacote = Guid.createEmpty.toString();
  @Output() voltarEmite = new EventEmitter();
  @Output() alterarTituloEmite = new EventEmitter();
  @Output() adicionarNaListagemEmit = new EventEmitter();
  @Output() salvarPacoteEmit = new EventEmitter();
  guid = Guid.createEmpty().toString();

  @ViewChild(AdminPacoteCategoriaComplementoComponent, { static: false })
  complementoComponent: AdminPacoteCategoriaComplementoComponent;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public rotaAtual: ActivatedRoute,
    private adminPacoteService: AdminPacoteService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    if (this.rotaAtual.routeConfig.path === 'editar/:id') {
      this.rotaAtual.params.subscribe(async (params: Params) => {
        this.idPacote = params['id'];
      });
    }

    this.categoriaForm = this.formBuilder.group({
      idCategoriaDoPacote: [Guid.createEmpty().toString()],
      idPacote: [this.idPacote],
      descricao: ['', Validators.required],
      lgAtivo: [true],
      lgOpcional: [false],
      ordem: ['', Validators.required],
      complementos: this.formBuilder.array([]),
    });
  }

  salvar(): void {
    this.salvarPacoteEmit.emit(this.categoriaForm.getRawValue());
  }

  carregarDados(data: any): void {
    this.categoriaForm.patchValue({
      idCategoriaDoPacote: data.idCategoriaDoPacote,
      idPacote: data.idPacote,
      descricao: data.descricao,
      lgAtivo: data.lgAtivo,
      lgOpcional: data.lgOpcional,
      ordem: data.ordem
    });
    this.carregarComplemento(data.complementos);
  }

  carregarComplemento(complementos: any): void {
    const complementosArray = this.categoriaForm.get('complementos') as FormArray;
    complementos.forEach(_ => {
      complementosArray.push(new FormControl(_));
    });
  }

  voltar(): void {
    this.voltarEmite.emit();
  }

  alterarTitulo(titulo: string): void {
    this.alterarTituloEmite.emit(titulo);
  }

  voltarCategoria(): void {
    if (this.complementoEdit !== undefined) {
      this.salvarComplemento(new FormControl(this.complementoEdit));
      this.complementoEdit = undefined;
    } else {
      this.alterarTituloEmite.emit('Categoria');
      this.mostrarListagemComplemento = !this.mostrarListagemComplemento;
    }
  }

  adicionarComplemento(): void {
    this.mostrarListagemComplemento = !this.mostrarListagemComplemento;
    this.alterarTitulo('Complemento');
  }
  salvarComplemento(item: any): void {
    const complemento = this.categoriaForm.get('complementos') as FormArray;
    complemento.push(item);
    this.alterarTituloEmite.emit('Categoria');
    this.mostrarListagemComplemento = !this.mostrarListagemComplemento;
    this.complementoEdit = undefined;
  }

  editarComplemento(item: any): void {
    this.adicionarComplemento();
    setTimeout(() => {
      const complemento = this.categoriaForm.get('complementos').value;
      this.complementoEdit = complemento.find(el => el.descricao === item.descricao);
      this.complementoComponent.editar(this.complementoEdit);
      this.excluirComplemento(item);
    }, 100);
  }

  excluirComplemento(item: any): void {
    const lista = this.categoriaForm.get('complementos').value as Array<any>;
    const idx = lista.findIndex(el => el.descricao === item.descricao);
    const complemento = this.categoriaForm.get('complementos') as FormArray;
    complemento.removeAt(idx);
  }
}

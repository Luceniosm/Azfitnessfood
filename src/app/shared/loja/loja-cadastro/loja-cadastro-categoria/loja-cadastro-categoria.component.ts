import { Component, OnInit } from '@angular/core';
import { Categoria } from './loja-cadastro-categoria-model/loja-cadastro-categoria.model';
import { CategoriaService } from './loja-cadastro-categoria.service';

@Component({
  selector: 'app-loja-cadastro-categoria',
  templateUrl: './loja-cadastro-categoria.component.html',
  styleUrls: ['./loja-cadastro-categoria.component.css']
})
export class LojaCadastroCategoriaComponent implements OnInit {
  categorias: Array<Categoria>;
  categoria: Categoria;
  visualizarListagem: boolean;
  contadorListagem = 1;
  constructor(
    private categoriaService: CategoriaService
  ) { }

  ngOnInit(): void {
    this.visualizarListagem = true;
    this.carregarCategorias();
  }

  carregarCategorias(): void {
    this.categoriaService.carregarCategoria().subscribe(_ => {
      if (_.success) {
        this.categorias = _.data;
      }
    });
  }

  editar(item: Categoria): void {
    this.categoria = item;
    this.visualizarListagem = false;
  }

  novoCategoria(): void {
    this.categoria = undefined;
    this.visualizarListagem = false;
  }

  visualizarListagemEmit() {
    this.visualizarListagem = true;
    this.carregarCategorias();
  }

}

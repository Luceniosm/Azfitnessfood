import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { AdminPacoteCategoria } from '../admin-pacote-model/admin-pacote-categoria.model';
import { AdminPacoteService } from '../admin-pacote.service';
import { AdminPacoteCategoriaCadastroComponent } from './admin-pacote-categoria-cadastro/admin-pacote-categoria-cadastro.component';
@Component({
  selector: 'app-admin-pacote-categoria',
  templateUrl: './admin-pacote-categoria.component.html',
  styleUrls: ['./admin-pacote-categoria.component.css']
})
export class AdminPacoteCategoriaComponent implements OnInit {
  categoriaContador = 1;
  mostrarListagemCategoria = true;
  titulo = 'Categoria';
  @Input() categorias = Array<AdminPacoteCategoria>();
  @Output() atualizarCategoriasEmit = new EventEmitter();
  @Input() idPacote = '';
  categoriaEdit: any;
  guid = Guid.createEmpty().toString();

  @ViewChild(AdminPacoteCategoriaCadastroComponent, { static: false })
  categoriaComponent: AdminPacoteCategoriaCadastroComponent;

  constructor(
    private adminPacoteService: AdminPacoteService,
  ) { }
  ngOnInit(): void { }

  novo(): void {
    this.mostrarListagemCategoria = !this.mostrarListagemCategoria;
  }

  voltarListagem(): void {
    if (this.categoriaEdit !== undefined) {
      this.categorias.push(this.categoriaEdit);
      this.categoriaEdit = undefined;
    }
    this.mostrarListagemCategoria = !this.mostrarListagemCategoria;
  }

  alterarTituloEmite(event: string): void {
    this.titulo = event;
  }

  editarCategoria(item: any): void {
    setTimeout(() => {
      this.categoriaEdit = item;
      this.categorias = this.categorias.filter(obj => obj !== item);
      this.categoriaComponent.carregarDados(item);
    }, 100);
    this.mostrarListagemCategoria = !this.mostrarListagemCategoria;
  }

  adicionarCategoriaNaListagem(categoria: any): void {
    if (this.categorias === undefined) {
      this.categorias = new Array<AdminPacoteCategoria>();
    }
    this.categorias.push(categoria);
    this.categoriaEdit = undefined;
    this.mostrarListagemCategoria = !this.mostrarListagemCategoria;
    this.atualizarCategoriasEmit.emit(this.categorias);
    if (this.idPacote !== '') {
      this.categoriaComponent.idPacote = this.idPacote;
    }
  }

  excluirCategoriaDoPacote(index: any): void {
    this.categorias.splice(index, 1);
  }

  salvarPacote(categorias: any) {
    this.categorias = categorias;
  }
}

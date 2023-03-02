import { Component, OnInit } from '@angular/core';
import { LojaCadastroProduto } from './loja-cadastro-produto-model/loja-cadastro-produto.model';
import { ProdutoService } from './loja-cadastro-produto.service';

@Component({
  selector: 'app-loja-cadastro-produto',
  templateUrl: './loja-cadastro-produto.component.html',
  styleUrls: ['./loja-cadastro-produto.component.css']
})
export class LojaCadastroProdutoComponent implements OnInit {
  produtos: Array<LojaCadastroProduto>;
  produto: LojaCadastroProduto;
  visualizarListagem: boolean;
  contadorListagem = 1;
  constructor(
    private produtoService: ProdutoService
  ) { }

  ngOnInit(): void {
    this.visualizarListagem = true;
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.produtoService.carregarTodosProdutos().subscribe(_ => {
      if (_.success) {
        this.produtos = _.data;
      }
    });
  }

  editar(item: LojaCadastroProduto): void {
    this.produto = item;
    this.visualizarListagem = false;
  }

  novoProduto(): void {
    this.produto = undefined;
    this.visualizarListagem = false;
  }

  visualizarListagemEmit() {
    this.visualizarListagem = true;
    this.carregarProdutos();
  }
}

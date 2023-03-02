import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LojaCarrinhoService } from './loja-carrinho/loja-carrinho.service';
import { LojaCarrinho } from './loja-model/loja-carrinho-model';
import { LojaCategoriaProduto } from './loja-model/loja-categoria-produto.model';
import { LojaProdutoResumido } from './loja-model/loja-produto-resumido.model';
import { LojaService } from './loja.service';


@Component({
  selector: 'app-loja',
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.css']
})
export class LojaComponent implements OnInit {
  categoriasProduto: Array<LojaCategoriaProduto>;

  constructor(
    private lojaService: LojaService,
    private lojaCarrinhoService: LojaCarrinhoService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.carregarProdutos();
  }
  carregarProdutos(): void {
    this.lojaService.carregarProdutosAtivos()
      .subscribe(result => {
        if (result.success) {
          this.categoriasProduto = result.data as Array<LojaCategoriaProduto>;
        }
      });
  }

  detalharProduto(itemProduto: LojaProdutoResumido): void {
    this.router.navigate(['home/loja/produto/', itemProduto.idProduto]);
  }

  incrementarProduto(itemProduto: LojaProdutoResumido): void {
    if (!itemProduto.quantidadeSelecionada) {
      itemProduto.quantidadeSelecionada = 1;
    } else if (itemProduto.quantidadeSelecionada >= itemProduto.quantidadeDisponivel) {
      return;
    } else {
      itemProduto.quantidadeSelecionada++;
    }
  }

  decrementarProduto(itemProduto: LojaProdutoResumido): void {
    if (itemProduto.quantidadeSelecionada >= 0) {
      itemProduto.quantidadeSelecionada--;
    }
  }

  adicionarProduto(itemProduto: LojaProdutoResumido): void {
    if (itemProduto.quantidadeSelecionada <= 0 || !itemProduto.quantidadeSelecionada) {
      this.toastr.warning('seleciona a quantidade desejada');
      return;
    }
    const data = new LojaCarrinho(
      itemProduto.idProduto,
      itemProduto.titulo,
      itemProduto.valor,
      itemProduto.quantidadeSelecionada,
      itemProduto.quantidadeDisponivel,
      itemProduto.imagem);
    this.lojaCarrinhoService.adicionarProduto(data);
  }

}

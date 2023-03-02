import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Guid } from 'guid-typescript';
import { ToastrService } from 'ngx-toastr';
import { LojaCarrinhoService } from '../loja-carrinho/loja-carrinho.service';
import { LojaCarrinho } from '../loja-model/loja-carrinho-model';
import { LojaProduto } from '../loja-model/loja-produto.model';
import { LojaService } from '../loja.service';

@Component({
  selector: 'app-loja-produto-detalhe',
  templateUrl: './loja-produto-detalhe.component.html',
  styleUrls: ['./loja-produto-detalhe.component.css']
})
export class LojaProdutoDetalheComponent implements OnInit {
  produto: LojaProduto;
  activeSliderId: any;
  showinformacao: boolean;
  constructor(
    private lojaService: LojaService,
    private lojaCarrinhoService: LojaCarrinhoService,
    private toastr: ToastrService,
    public rotaAtual: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.showinformacao = false;
    this.rotaAtual.params.subscribe(async (params: Params) => {
      if (params['idProduto'] !== Guid.createEmpty().toString()) {
        const idProduto = params['idProduto'];
        this.carregarProduto(idProduto);
      }
    });
  }
  carregarProduto(idProduto): void {
    this.lojaService.carregarProdutoPorId(idProduto)
      .subscribe(result => {
        if (result.success) {
          this.produto = result.data;
        }
      });
  }

  setImgSlide(idx: number): void {
    this.activeSliderId = idx;
  }

  setShowInformacao(): void {
    this.showinformacao = !this.showinformacao;
  }

  incrementarProduto(itemProduto: LojaProduto): void {
    if (!itemProduto.quantidadeSelecionada) {
      itemProduto.quantidadeSelecionada = 1;
    } else if (itemProduto.quantidadeSelecionada >= itemProduto.quantidadeDisponivel) {
      return;
    } else {
      itemProduto.quantidadeSelecionada++;
    }
  }

  decrementarProduto(itemProduto: LojaProduto): void {
    if (itemProduto.quantidadeSelecionada >= 0) {
      itemProduto.quantidadeSelecionada--;
    }
  }

  adicionarProduto(itemProduto: LojaProduto): void {
    itemProduto.quantidadeSelecionada = 1;
    const data = new LojaCarrinho(
      itemProduto.idProduto,
      itemProduto.titulo,
      itemProduto.valor,
      itemProduto.quantidadeSelecionada,
      itemProduto.quantidadeDisponivel,
      itemProduto.imagens.find(el => el.principal));
    this.lojaCarrinhoService.adicionarProduto(data);
  }
}

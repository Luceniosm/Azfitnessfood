import { Component, Input, OnInit } from '@angular/core';
import { LojaCarrinhoService } from '../loja-carrinho/loja-carrinho.service';
import { LojaCarrinho } from '../loja-model/loja-carrinho-model';

@Component({
  selector: 'app-loja-carrinho-resumo',
  templateUrl: './loja-carrinho-resumo.component.html',
  styleUrls: ['./loja-carrinho-resumo.component.css']
})
export class LojaCarrinhoResumoComponent implements OnInit {
  @Input() taxa: number;
  // carrinho = this.lojaCarrinhoService.buscarCarrinhoStorage();
  constructor(
    private lojaCarrinhoService: LojaCarrinhoService,
  ) { }

  ngOnInit(): void {

  }


  carrinho(): Array<LojaCarrinho> {
    return this.lojaCarrinhoService.buscarCarrinhoStorage();
  }


  totalProdutos(): number {
    return this.carrinho().map(el => el.quantidadeSelecionada).reduce((prev, value) => prev + value, 0);
  }

  valorProdutos(): any {
    return this.carrinho().map(el => (el.quantidadeSelecionada * el.valor))
      .reduce((prev, value) => prev + value, 0);
  }

  calcularTaxa(): number {
    if (!this.taxa || this.taxa === 0) {
      return 0;
    }

    return (this.valorProdutos() * this.taxa) / 100;
  }

  valorTotal(): number {
    const teste = this.valorProdutos() + this.calcularTaxa();
    return teste;
  }

}

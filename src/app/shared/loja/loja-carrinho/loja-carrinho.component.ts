import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthModel } from 'src/app/models/authentication/auth.model';
import { LojaCarrinho } from '../loja-model/loja-carrinho-model';
import { LojaCarrinhoService } from './loja-carrinho.service';

@Component({
  selector: 'app-loja-carrinho',
  templateUrl: './loja-carrinho.component.html',
  styleUrls: ['./loja-carrinho.component.css']
})
export class LojaCarrinhoComponent implements OnInit {
  carrinho = Array<LojaCarrinho>();
  idCurrentUser = (JSON.parse(localStorage.getItem('currentUser')) as AuthModel)?.user?.idUsuario;
  constructor(
    private lojaCarrinhoService: LojaCarrinhoService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.carrinho = this.lojaCarrinhoService.buscarCarrinhoStorage();
    if (!this.carrinho || this.carrinho.length === 0) {
      this.router.navigate(['home/loja/']);
      return;
    }
  }

  incrementarProduto(itemProduto: LojaCarrinho): void {
    if (!itemProduto.quantidadeSelecionada) {
      itemProduto.quantidadeSelecionada = 1;
    } else if (itemProduto.quantidadeSelecionada >= itemProduto.quantidadeDisponivel) {
      return;
    } else {
      itemProduto.quantidadeSelecionada++;
    }
    this.lojaCarrinhoService.atualizarCarrinhoStorage(this.carrinho);
  }

  decrementarProduto(itemProduto: LojaCarrinho): void {
    if (itemProduto.quantidadeSelecionada >= 2) {
      itemProduto.quantidadeSelecionada--;
    }
    this.lojaCarrinhoService.atualizarCarrinhoStorage(this.carrinho);
  }

  removerItemLista(itemProduto: LojaCarrinho): void {
    this.carrinho.splice(this.carrinho.indexOf(itemProduto), 1);
    if (this.carrinho.length <= 0) {
      this.lojaCarrinhoService.limpar();
      this.router.navigate(['home/loja/']);
    }

    this.lojaCarrinhoService.atualizarCarrinhoStorage(this.carrinho);
  }

  validarDados(): void {
    if (this.idCurrentUser === undefined) {
      this.router.navigate([`login`]);
      localStorage.setItem('rota', JSON.stringify('cliente/pagamento'));
      return;
    }

    this.router.navigate([`cliente/pagamento`]);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LojaCarrinhoService } from '../loja-carrinho/loja-carrinho.service';

@Component({
  selector: 'app-loja-carrinho-item-contador',
  templateUrl: './loja-carrinho-item-contador.component.html',
  styleUrls: ['./loja-carrinho-item-contador.component.css']
})
export class LojaCarrinhoItemContadorComponent implements OnInit {

  constructor(
    private lojaCarrinhoService: LojaCarrinhoService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  itensNoCarrinho(): number {
    return this.lojaCarrinhoService.quantidadeDeProdutos();
  }

  carrinho(): void {
    if (this.itensNoCarrinho() <= 0) {
      this.toastr.warning('Seu carrinho está vazio!');
      return;
    }
    this.router.navigate(['home/loja/carrinho/']);
  }

}

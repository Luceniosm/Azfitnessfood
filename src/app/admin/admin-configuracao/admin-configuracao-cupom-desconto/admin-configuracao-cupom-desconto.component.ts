import { Component, OnInit } from '@angular/core';
import { CupomDeDesconto } from './admin-configuracao-cupom-desconto-model/admin-configuracao-cupom-desconto-model';
import { CupomDeDescontoService } from './admin-configuracao-cupom-desconto.service';

@Component({
  selector: 'app-admin-configuracao-cupom-desconto',
  templateUrl: './admin-configuracao-cupom-desconto.component.html',
  styleUrls: ['./admin-configuracao-cupom-desconto.component.css']
})
export class AdminConfiguracaoCupomDescontoComponent implements OnInit {
  cupomDeDescontoContador = 1;
  cuponsDeDesconto: Array<CupomDeDesconto>;
  cupomDeDesconto: CupomDeDesconto;
  visualizarListagem: boolean;
  constructor(
    private cupomDeDescontoService: CupomDeDescontoService
  ) { }

  ngOnInit(): void {
    this.visualizarListagem = true;
    this.carregarCuponsDeDesconto();
  }

  carregarCuponsDeDesconto(): void {
    this.cupomDeDescontoService.carregarTodasCuponsDeDesconto().subscribe(_ => {
      if (_.success) {
        this.cupomDeDesconto = _.data;
      }
    });
  }

  editar(item: CupomDeDesconto): void {
    this.cupomDeDesconto = item;
    this.visualizarListagem = false;
  }

  novoCupomDeDesconto(): void {
    this.cupomDeDesconto = undefined;
    this.visualizarListagem = false;
  }

  visualizarListagemEmit() {
    this.visualizarListagem = true;
    this.carregarCuponsDeDesconto();
  }

}

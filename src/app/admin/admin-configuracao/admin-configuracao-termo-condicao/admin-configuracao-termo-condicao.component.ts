import { Component, OnInit } from '@angular/core';
import { TermoCondicao } from './admin-configuracao-termo-condicao-model/admin-configuracao-termo-condicao.model';
import { AdminConfiguracaoTermoCondicaoService } from './admin-configuracao-termo-condicao.service';

@Component({
  selector: 'app-admin-configuracao-termo-condicao',
  templateUrl: './admin-configuracao-termo-condicao.component.html',
  styleUrls: ['./admin-configuracao-termo-condicao.component.css']
})
export class AdminConfiguracaoTermoCondicaoComponent implements OnInit {

  visualizarEditor = false;
  termosCondicoes: Array<TermoCondicao>;
  termoSelecionado = new TermoCondicao();

  constructor(
    private termoCondicaoService: AdminConfiguracaoTermoCondicaoService
  ) { }

  ngOnInit(): void {
    this.carregarTermoCondicao();
  }

  visualizar(item: TermoCondicao): void {
    this.visualizarEditor = true;
    this.termoSelecionado = item;
  }

  carregarTermoCondicao() {
    this.termoCondicaoService.carregarTermoCondicao()
      .subscribe((result) => {
        if (result.success) {
          this.termosCondicoes = <Array<TermoCondicao>>result.data;
        }
      });
  }

  visualizarEditorEmit() {
    this.visualizarEditor = false;
    this.carregarTermoCondicao();
  }

  novoTermoECondicao(): void {
    this.termoSelecionado = new TermoCondicao();
    this.visualizarEditor = true;
  }

}

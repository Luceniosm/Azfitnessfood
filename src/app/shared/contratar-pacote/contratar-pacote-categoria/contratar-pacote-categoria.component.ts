import { Component, Input, OnInit } from '@angular/core';
import { CategoriaDoPacote } from '../contratar-pacote-model/contratar-pacote-categoria.model';
import { ComplementoDaCategoria } from '../contratar-pacote-model/contratar-pacote-complemento.model';
import { Pacote } from '../contratar-pacote-model/contratar-pacote.model';

@Component({
  selector: 'app-contratar-pacote-categoria',
  templateUrl: './contratar-pacote-categoria.component.html',
  styleUrls: ['./contratar-pacote-categoria.component.css']
})
export class ContratarPacoteCategoriaComponent implements OnInit {
  @Input() categorias: Array<CategoriaDoPacote>;
  @Input() pacote: Pacote;

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  incrementarComplemento(complemento: ComplementoDaCategoria): void {
    if (complemento.quantidadeSelecionada >= complemento.quantidadeMaxima) {
      return;
    }

    if (isNaN(complemento.quantidadeSelecionada)) {
      complemento.quantidadeSelecionada = 1;
    } else {
      complemento.quantidadeSelecionada++;
    }
  }

  decrementarComplemento(complemento: ComplementoDaCategoria): void {
    if (complemento.quantidadeSelecionada <= 0) {
      return;
    }

    if (isNaN(complemento.quantidadeSelecionada)) {
      complemento.quantidadeSelecionada = 0;
    } else {
      complemento.quantidadeSelecionada--;
    }
  }
  selecionarItemDoComplemento(complemento: ComplementoDaCategoria, idItemDoComplemento: string) {

    complemento.itensDoComplemento.forEach(element => {
      if (element.idItemDoComplemento === idItemDoComplemento) {
        element.check = !element.check;
      } else {
        element.check = false;
      }
    });
  }
}

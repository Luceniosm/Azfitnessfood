import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { BalaoConfirmacaoService } from 'src/app/shared/balao-confirmacao/balao-confirmacao.service';
import { ClientePacoteData } from '../cliente-pacote-antecipar-model/cliente-pacote-antecipar-data.model';
import { ClientePacoteAnteciparEtapaEnum } from '../cliente-pacote-antecipar-model/cliente-pacote-antecipar-etapa.enum';

@Component({
  selector: 'app-cliente-pacote-antecipar-quantidade',
  templateUrl: './cliente-pacote-antecipar-quantidade.component.html',
  styleUrls: ['./cliente-pacote-antecipar-quantidade.component.css']
})
export class ClientePacoteAnteciparQuantidadeComponent {
  @Output() selecioneEtapaEmite = new EventEmitter();
  @Output() confirmarAntecipacaoEmite = new EventEmitter();
  @Input() formAntecipacao: FormGroup;
  @Input() quantidadeDisponivel: number;

  clientePacoteAnteciparEtapaEnum = ClientePacoteAnteciparEtapaEnum;
  constructor(
    private balaoConfirmacaoService: BalaoConfirmacaoService
  ) { }


  get datasSelecionadas(): Array<ClientePacoteData> {
    return this.formAntecipacao.get('datasSelecionadas').value;
  }

  notificarconfirmacaoAntecipacao(): void {
    this.balaoConfirmacaoService.confirm(
      {
        message: 'Confirmar antecipação?',
        btnOkText: 'Sim',
        btnCancelText: 'Não'
      }
    ).subscribe((result) => result ? this.confirmarAntecipacaoEmite.emit() : null);
  }

  voltar() {
    this.selecioneEtapaEmite.emit(this.clientePacoteAnteciparEtapaEnum.selecionaAntecipacao);
  }

  selecioneEtapa() {
    this.selecioneEtapaEmite.emit(this.clientePacoteAnteciparEtapaEnum.concluir);
  }

  validarQuantidade(): number {
    return this.formAntecipacao.get('datasSelecionadas').value.reduce((prev, next) => prev + +next.quantidade, 0);
  }


}

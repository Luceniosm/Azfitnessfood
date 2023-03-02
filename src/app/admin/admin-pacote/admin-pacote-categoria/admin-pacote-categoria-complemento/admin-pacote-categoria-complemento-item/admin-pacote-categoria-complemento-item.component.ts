import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-admin-pacote-categoria-complemento-item',
  templateUrl: './admin-pacote-categoria-complemento-item.component.html',
  styleUrls: ['./admin-pacote-categoria-complemento-item.component.css']
})
export class AdminPacoteCategoriaComplementoItemComponent implements OnInit {
  itemForm: FormGroup;
  @Output() voltarComplementoEmit = new EventEmitter();
  @Output() salvarItemComplementoEmit = new EventEmitter();
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.itemForm = this.formBuilder.group({
      idItemDoComplemento: [Guid.createEmpty().toString()],
      idComplementoDaCategoria: [Guid.createEmpty().toString()],
      descricao: ['', Validators.required],
      valor: ['', Validators.required],
      peso: [0, Validators.required],
      lgAtivo: [true]
    });
  }
  voltar(): void {
    this.voltarComplementoEmit.emit();
  }

  salvar(): void {
    this.salvarItemComplementoEmit.emit(this.itemForm);
  }

  editar(item: any): void {
    this.itemForm.patchValue({
      idItemDoComplemento: item.idItemDoComplemento,
      idComplementoDaCategoria: item.idComplementoDaCategoria,
      descricao: item.descricao,
      valor: item.valor,
      peso: item.peso,
      lgAtivo: item.lgAtivo
    });
  }
}

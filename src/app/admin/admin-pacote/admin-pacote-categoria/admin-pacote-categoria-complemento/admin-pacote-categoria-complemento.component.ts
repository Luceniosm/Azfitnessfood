import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { AdminPacoteCategoriaComplementoItemComponent } from './admin-pacote-categoria-complemento-item/admin-pacote-categoria-complemento-item.component';

@Component({
  selector: 'app-admin-pacote-categoria-complemento',
  templateUrl: './admin-pacote-categoria-complemento.component.html',
  styleUrls: ['./admin-pacote-categoria-complemento.component.css'],
})
export class AdminPacoteCategoriaComplementoComponent implements OnInit {
  itemDoComplementoContador = 1;
  complementoForm: FormGroup;
  mostrarItemDoComplemento = false;
  itemDoComplemento: any;
  @Output() voltarCategoriaEmit = new EventEmitter();
  @Output() alterarTituloEmite = new EventEmitter();
  @Output() salvarComplementoEmit = new EventEmitter();
  @ViewChild(AdminPacoteCategoriaComplementoItemComponent, { static: false })
  itemDoComplementoComponent: AdminPacoteCategoriaComplementoItemComponent;
  guid = Guid.createEmpty().toString();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.complementoForm = this.formBuilder.group({
      idComplementoDaCategoria: [Guid.createEmpty().toString()],
      idCategoriaDoPacote: [Guid.createEmpty().toString()],
      descricao: ['', Validators.required],
      valor: [0, Validators.required],
      peso: [0, Validators.required],
      quantidadeMaxima: ['', Validators.required],
      lgAtivo: [true],
      itensDoComplemento: this.formBuilder.array([])
    });
  }

  adicionarItemDoComplemento(): void {
    this.mostrarItemDoComplemento = !this.mostrarItemDoComplemento;
    this.alterarTituloEmite.emit('Item do Complemento');
  }

  voltar(): void {
    this.buildForm();
    this.voltarCategoriaEmit.emit();
  }

  salvar(): void {
    this.salvarComplementoEmit.emit(this.complementoForm);
  }

  editar(item: any): void {
    this.complementoForm.patchValue({
      idComplementoDaCategoria: item.idComplementoDaCategoria,
      idCategoriaDoPacote: item.idCategoriaDoPacote,
      descricao: item.descricao,
      valor: item.valor,
      peso: item.peso,
      quantidadeMaxima: item.quantidadeMaxima,
      lgAtivo: item.lgAtivo
    });
    this.carregarItensDoComplemento(item.itensDoComplemento);
  }

  carregarItensDoComplemento(itens: Array<any>): void {
    const itensArray = this.complementoForm.get('itensDoComplemento') as FormArray;
    itens?.forEach(_ => {
      itensArray.push(new FormControl(_));
    });
  }

  voltarComplemento(): void {
    this.alterarTituloEmite.emit('Complemento');
    if (this.itemDoComplemento !== undefined) {
      this.salvarItemComplemento(new FormControl(this.itemDoComplemento));
      this.itemDoComplemento = undefined;
    } else {
      this.mostrarItemDoComplemento = !this.mostrarItemDoComplemento;
    }
  }

  salvarItemComplemento(item: any): void {
    const itensDoComplemento = this.complementoForm.get('itensDoComplemento') as FormArray;
    itensDoComplemento.push(item);
    this.alterarTituloEmite.emit('Complemento');
    this.mostrarItemDoComplemento = !this.mostrarItemDoComplemento;
  }

  editarItemDoComplemento(item: any): void {
    this.adicionarItemDoComplemento();
    setTimeout(() => {
      this.itemDoComplemento = item;
      this.itemDoComplementoComponent.editar(this.itemDoComplemento);
      this.excluirItemDoComplemento(item);
    }, 100);
  }

  excluirItemDoComplemento(item: any): void {
    const itemSelecionado = this.complementoForm.get('itensDoComplemento') as FormArray;
    itemSelecionado.removeAt(this.complementoForm.get('itensDoComplemento').value.findIndex(el => el.idItemDoComplemento === item.idItemDoComplemento));
  }
}

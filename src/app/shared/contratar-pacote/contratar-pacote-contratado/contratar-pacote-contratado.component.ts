import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-contratar-pacote-contratado',
  templateUrl: './contratar-pacote-contratado.component.html',
  styleUrls: ['./contratar-pacote-contratado.component.css']
})
export class ContratarPacoteContratadoComponent implements OnInit {
  @Output() voltarEmit = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  voltar(): void {
    this.voltarEmit.emit();
  }
}

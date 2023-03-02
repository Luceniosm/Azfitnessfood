import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-balao-confirmacao',
  templateUrl: './balao-confirmacao.component.html',
  styleUrls: ['./balao-confirmacao.component.css']
})
export class BalaoConfirmacaoComponent implements OnInit {
  message: string;
  btnOkText: string;
  btnCancelText: string;
  result: boolean;
  alert: false;

  constructor(public bsModalRef: BsModalRef) { }

  public ngOnInit(): void {
  }

  confirm(): void {
    this.bsModalRef.hide();
    this.result = true;
  }

  decline(): void {
    this.bsModalRef.hide();
    this.result = false;
  }
}

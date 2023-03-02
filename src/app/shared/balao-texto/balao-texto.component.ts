import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-balao-texto',
  templateUrl: './balao-texto.component.html',
  styleUrls: ['./balao-texto.component.css']
})
export class BalaoTextoComponent implements OnInit {
  @Input() title: string;
  @Input() item: any;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;
  value: string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }
}

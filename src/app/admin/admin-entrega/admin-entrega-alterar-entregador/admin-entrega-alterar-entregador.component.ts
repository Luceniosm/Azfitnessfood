import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Entregador } from '../../admin-entregador/admin-entregador-model/admin-entregador.model';
import { ToastrService } from 'ngx-toastr';
import { AdminServiceEntrega } from '../admin-entrega.service';
import { Entrega } from '../admin-entrega-model/admin-entrega.model';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-admin-entrega-alterar-entregador',
  templateUrl: './admin-entrega-alterar-entregador.component.html',
  styleUrls: ['./admin-entrega-alterar-entregador.component.css']
})
export class AdminEntregaAlterarEntregadorComponent implements OnInit {
  @Input() formEntrega: FormGroup;
  @Input() entregadores = Array<Entregador>();
  @Output() atualizarGrid = new EventEmitter();
  @Output() fecharModal = new EventEmitter();
  entregador: Entrega;


  constructor(
    private adminServiceEntrega: AdminServiceEntrega,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.entregador = new Entrega();
  }


  isValid(input: any) {
    return input.value === Guid.createEmpty().toString();
  }

  salvarEntregador() {
    this.entregador.idEntrega = this.formEntrega.get('idEntrega').value;
    this.entregador.idContratacaoPacote = this.formEntrega.get('idContratacaoPacote').value;
    this.entregador.idEntregador = this.formEntrega.get('idEntregador').value;
    this.entregador.idEndereco = this.formEntrega.get('idEndereco').value;
    this.entregador.idEndereco = this.formEntrega.get('idEndereco').value;
    this.entregador.idCliente = this.formEntrega.get('idCliente').value;

    if (this.entregador.idEntrega === Guid.createEmpty().toString()) {
      this.adminServiceEntrega.cadastrarEntrega(this.formEntrega.getRawValue()).subscribe(_ => {
        if (_.success) {
          this.toastr.success('Entregador cadastrado com sucesso!');
          this.atualizarGrid.emit();
        }
      });
    } else {
      this.adminServiceEntrega.alterarEntrega(this.formEntrega.getRawValue()).subscribe(_ => {
        if (_.success) {
          this.toastr.success('Entregador alterado com sucesso!');
          this.atualizarGrid.emit();
        }
      });
    }
  }

  voltar() {
    this.fecharModal.emit();
  }
}


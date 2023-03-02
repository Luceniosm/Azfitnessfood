import { AfterContentInit, Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AuthModel } from 'src/app/models/authentication/auth.model';
import { UserModel } from 'src/app/models/authentication/user.model';
import { ClienteEnderecoModel } from 'src/app/models/cliente/cliente-endereco.model';
import { LojaCarrinhoService } from '../loja-carrinho/loja-carrinho.service';
import { LojaFormaDePagamento } from '../loja-model/loja-pagamento.model';
import { LojaService } from '../loja.service';

@Component({
  selector: 'app-loja-pagamento',
  templateUrl: './loja-pagamento.component.html',
  styleUrls: ['./loja-pagamento.component.css']
})
export class LojaPagamentoComponent implements OnInit, AfterContentInit {
  cliente: UserModel;
  enderecoEntrega: ClienteEnderecoModel;
  formasDePagamentos: Array<LojaFormaDePagamento>;
  observacao = '';
  modalRef: BsModalRef;
  pedidoForm: FormGroup;
  taxa: number;
  pedidoFinalizado = false;

  constructor(
    private router: Router,
    private lojaService: LojaService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private lojaCarrinhoService: LojaCarrinhoService,
    private toastr: ToastrService
  ) { }
  ngAfterContentInit(): void {
    this.carregarEndereco();
  }

  ngOnInit(): void {
    this.carregarEndereco();
    this.carregarFormasDePagamento();
    this.initForm();
  }
  carregarEndereco(): void {
    this.cliente = (JSON.parse(localStorage.getItem('currentUser')) as AuthModel)?.user;
    if (this.cliente.enderecos.length === 1) {
      this.enderecoEntrega = this.cliente.enderecos[0];
    } else {
      this.enderecoEntrega = this.cliente.enderecos.find(el => el.lgPrincipal);
    }
  }
  cadastrarEndereco(): void {
    localStorage.setItem('rota', JSON.stringify('cliente/pagamento'));
    this.router.navigate([`cliente/endereco/cadastro`]);
  }

  carregarFormasDePagamento() {
    this.lojaService.carregarFormasDePagamento().subscribe(formasDePagamenmto => {
      if (formasDePagamenmto.success) {
        this.formasDePagamentos = <Array<LojaFormaDePagamento>>formasDePagamenmto.data;
      }
    });
  }
  initForm(): void {
    this.pedidoForm = this.formBuilder.group({
      idUsuario: [this.cliente.idUsuario],
      idEnderecoDeEntrega: [this.enderecoEntrega?.idUsuarioEndereco, [Validators.required]],
      idFormaDePagamento: ['', [Validators.required]],
      PedidoItens: [this.lojaCarrinhoService.buscarCarrinhoStorage(), [Validators.required]],
      observacao: [''],
      retirarNaLoja: [false],
    });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  alterarEndereco(enderecoSelecionado: ClienteEnderecoModel): void {
    this.enderecoEntrega = enderecoSelecionado;
    this.pedidoForm.patchValue({
      idEnderecoDeEntrega: enderecoSelecionado.idUsuarioEndereco
    });
    this.modalRef.hide();
  }

  validarDados(): void {
    const mensagens = this.camposInvalidos();
    if (mensagens.length > 0) {
      mensagens.forEach(element => {
        this.toastr.warning(element);
      });

      return;
    }

    this.lojaService.cadastrarPedido(this.pedidoForm.getRawValue()).subscribe(el => {
      if (el.success) {
        this.lojaCarrinhoService.limpar();
        this.pedidoFinalizado = true;
      }
    });

  }

  public camposInvalidos(): Array<string> {
    const campos = [];
    const controls = this.pedidoForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        switch (name) {
          case 'idEnderecoDeEntrega':
            campos.push('informe o endereço');
            break;
          case 'idFormaDePagamento':
            campos.push('informa a Forma de Pagamento');
            break;
          default:
            break;
        }

      }
    }
    return campos;
  }
}

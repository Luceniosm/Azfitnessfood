import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AuthModel } from 'src/app/models/authentication/auth.model';
import * as _ from 'underscore';
import { BalaoConfirmacaoService } from '../balao-confirmacao/balao-confirmacao.service';
import { PacoteAgrupado } from './contratar-pacote-model/contratar-pacote-agrupado.model';
import { CategoriaDoPacote } from './contratar-pacote-model/contratar-pacote-categoria.model';
import { DataMaximaParaIniciarPacote } from './contratar-pacote-model/contratar-pacote-data-maxima-para-iniciar-pacote.model';
import { MenuFormaDePagamento } from './contratar-pacote-model/contratar-pacote-forma-de-pagamento.model';
import { Pacote } from './contratar-pacote-model/contratar-pacote.model';
import { ContratarPacoteService } from './contratar-pacote.service';

@Component({
  selector: 'app-contratar-pacote',
  templateUrl: './contratar-pacote.component.html',
  styleUrls: ['./contratar-pacote.component.css']
})
export class ContratarPacoteComponent implements OnInit {
  @Input() cssFormaPagamento: string;
  idCurrentUser = (JSON.parse(localStorage.getItem('currentUser')) as AuthModel)?.user?.idUsuario;
  mostrarCadastroEndereco = false;
  contratoFinalizado = false;
  pacotesAgrupados: Array<PacoteAgrupado>;
  pacote: Pacote;
  contratoForm: FormGroup;
  dataParaIniciarPacote: DataMaximaParaIniciarPacote;
  formasDePagamentos: Array<MenuFormaDePagamento>;
  observacaoFormaDePagamento: string;
  modalRef: BsModalRef;
  lgVoltarCadastro = false;
  cssPagamento = '';

  constructor(
    private contratarPacoteService: ContratarPacoteService,
    private formBuilder: FormBuilder,
    private datepipe: DatePipe,
    private modalService: BsModalService,
    private balaoConfirmacaoService: BalaoConfirmacaoService,
    private toastr: ToastrService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.cssPagamento = this.cssFormaPagamento === undefined ? 'fix' : this.cssFormaPagamento;
    this.listar();
    this.initForm();
    this.carregueDataMaximaParaIniciarPacote();
    this.carregarFormasDePagamento();
  }

  listar(): void {
    this.contratarPacoteService.carregarPacotesAtivos().subscribe(pacotesAtivos => {
      if (pacotesAtivos.success) {
        this.pacotesAgrupados = <Array<PacoteAgrupado>>pacotesAtivos.data;
      }
    });
  }

  initForm(): void {
    this.contratoForm = this.formBuilder.group({
      idUsuarioContratacaoPacote: [this.idCurrentUser],
      idFormaDePagamento: ['', [Validators.required]],
      dataInicio: ['', [Validators.required]],
      observacao: [''],
      subTotal: ['', [Validators.required]],
      adicionalTotal: [''],
      taxaDeEntrega: [0, [Validators.required]],
      lgTermoAceito: ['', [Validators.requiredTrue]],
      codigoCupom: [''],
      lgRevonacaoAutomatica: [false]
    });
  }

  carregueDataMaximaParaIniciarPacote() {
    this.contratarPacoteService.carregarDataMaximaParaIniciarPacote()
      .subscribe(result => {
        if (result.success) {
          this.dataParaIniciarPacote = result.data as DataMaximaParaIniciarPacote;
          const data = this.datepipe.transform(_.first(this.dataParaIniciarPacote.datasParaInicioPacote), 'yyyy-MM-dd');
          this.contratoForm.get('dataInicio').setValue(data);
        }
      });
  }

  carregarFormasDePagamento() {
    this.contratarPacoteService.carregarFormasDePagamento().subscribe(formasDePagamenmto => {
      if (formasDePagamenmto.success) {
        this.formasDePagamentos = <Array<MenuFormaDePagamento>>formasDePagamenmto.data;
      }
    });
  }

  selecionarForma() {
    const idFormaDePagamento = this.contratoForm.get('idFormaDePagamento').value;
    const formaPagamento = this.formasDePagamentos.find(el => el.idFormaDePagamento === idFormaDePagamento);
    if (formaPagamento !== undefined) {
      if (formaPagamento.observacao) {
        this.observacaoFormaDePagamento = formaPagamento.observacao;
      } else if (formaPagamento.porcentagemDeAcrescimo > 0) {
        this.observacaoFormaDePagamento = 'Acréscimo de ' + formaPagamento.porcentagemDeAcrescimo + '% no valor total';
      } else {
        this.observacaoFormaDePagamento = undefined;
      }
    }
  }

  comprar(item: Pacote): void {
    this.pacote = Object.assign({}, item);
    this.initForm();
    const data = this.datepipe.transform(_.first(this.dataParaIniciarPacote.datasParaInicioPacote), 'yyyy-MM-dd');
    this.contratoForm.get('dataInicio').setValue(data);
    this.pacote.categorias.forEach(element => {
      element.complementos.forEach(complemento => {
        complemento.quantidadeSelecionada = 0;
        complemento.itensDoComplemento.forEach(itemDoComplemento => {
          itemDoComplemento.check = false;
        });
      });
    });
  }

  voltar(): void {
    this.pacote = undefined;
    this.contratoFinalizado = false;
  }
  calcularSubTotal(): number {
    const subtotal = this.calcularItensSelecionados(this.pacote.categorias.filter(categoria => !categoria.lgOpcional));
    this.contratoForm.patchValue({
      subTotal: subtotal
    });
    return subtotal;
  }

  calcularAdicional(): number {
    const subtotal = this.calcularItensSelecionados(this.pacote.categorias.filter(categoria => categoria.lgOpcional));
    this.contratoForm.patchValue({
      adicionalTotal: subtotal
    });
    return subtotal;
  }

  calcularItensSelecionados(categorias: Array<CategoriaDoPacote>) {
    let subtotal = 0;
    categorias.forEach(categoria => {
      categoria.complementos.forEach(complemento => {
        let calculo = 0;
        if (complemento.quantidadeSelecionada > 0) {
          complemento.itensDoComplemento.forEach(itemDoComplemento => {
            if (itemDoComplemento.check) {
              calculo += itemDoComplemento.valor;
            }
          });
          calculo = (calculo + complemento.valor) * complemento.quantidadeSelecionada;
        }
        subtotal += calculo;
      });
    });
    return subtotal;
  }

  calcularFormaDePagamento(): number {
    const idFormaDePagamento = this.contratoForm.get('idFormaDePagamento').value;
    const formaPagamento = this.formasDePagamentos.find(el => el.idFormaDePagamento === idFormaDePagamento);
    if (formaPagamento !== undefined) {
      return ((this.contratoForm.get('subTotal').value + this.contratoForm.get('adicionalTotal').value + this.contratoForm.get('taxaDeEntrega').value) * formaPagamento.porcentagemDeAcrescimo) / 100;
    }
    return 0;
  }
  calcularTotal(): number {
    return this.calcularSubTotal() + this.calcularAdicional() + this.contratoForm.get('taxaDeEntrega').value + this.calcularFormaDePagamento();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  validarCadastroDeEndereco(): void {
    if (this.idCurrentUser === undefined) {
      this.balaoConfirmacaoService.confirm({
        message: 'Você precisa está logando para realizar o pedido.<br> Deseja realizar o login?',
        btnOkText: 'Sim',
        btnCancelText: 'Não'
      }).subscribe((result) => {
        this.router.navigate([`login`]);
      });
      return;
    }

    const userId = this.clienteContratacaoPacote();
    this.contratarPacoteService.validarCadastroDeEndereco(userId)
      .subscribe(endereco => {
        if (endereco.success) {
          if (!endereco.data) {
            this.balaoConfirmacaoService.confirm({
              message: 'Você não possuí endereço de entrega deseja cadastrar para finalizar a contração?',
              btnOkText: 'Sim',
              btnCancelText: 'Não'
            }).subscribe((result) => result ? this.mostrarCadastroEndereco = true : null);
          } else {
            this.validarItensObrigatorios();
          }
        }
      });
  }

  validarItensObrigatorios(): void {
    const mensagens = [];
    this.pacote.categorias.filter(categoria => categoria.lgOpcional === false).forEach(categoria => {
      const elementoSelecionado = categoria.complementos.filter(complemento => complemento.quantidadeSelecionada > 0);
      if (elementoSelecionado.length === 0) {
        mensagens.push(`selecione ${categoria.descricao}`);
      }
      elementoSelecionado.forEach(elemento => {
        if (elemento.itensDoComplemento.length > 0) {
          const checado = elemento.itensDoComplemento.filter(itemDoComplemento => itemDoComplemento.check);
          if (checado.length === 0) {
            mensagens.push(`selecione item de ${elemento.descricao}`);
          }
        }
      });

    });

    if (
      new Date(this.contratoForm.get('dataInicio').value) >
      new Date(_.last(this.dataParaIniciarPacote.datasParaInicioPacote))
    ) {
      mensagens.push(`Selecione a data inferior a ` + this.datepipe.transform(_.last(this.dataParaIniciarPacote.datasParaInicioPacote), 'dd/MM/yyyy'));
    }


    if (mensagens.length > 0) {
      mensagens.forEach(element => {
        this.toastr.warning(element);
      });

      return;
    }

    if (this.contratoForm.get('taxaDeEntrega').value === 0) {
      this.balaoConfirmacaoService.confirm({
        message: 'Você optou pera retirada no local, Deseja finalizar a contração?',
        btnOkText: 'Sim',
        btnCancelText: 'Não'
      }).subscribe((result) => result ? this.notificarCustos() : null);
      return;
    }

    this.notificarCustos();
  }

  notificarCustos(): void {
    this.balaoConfirmacaoService.confirm({
      message: 'Deseja confirmar o pedido? <br><small><b>Obs: </b>Em caso do envio do produto,<b> O custo</b>, será totalmente do contratante.</small>',
      btnOkText: 'Sim',
      btnCancelText: 'Não'
    }).subscribe((result) => result ? this.confirmar() : null);
  }

  confirmar(): void {
    const data = {
      idPacote: this.pacote.idPacote,
      idFormaDePagamento: this.contratoForm.get('idFormaDePagamento').value,
      idTipoDoPacote: this.pacote.idTipoDoPacote,
      idUsuarioContratacaoPacote: this.clienteContratacaoPacote(),
      dataInicialPacote: this.contratoForm.get('dataInicio').value,
      observacao: this.contratoForm.get('observacao').value,
      valorContratado: this.calcularTotal(),
      consumacao: this.pacote.diasConsumacao,
      lgTermoAceito: this.contratoForm.get('lgTermoAceito').value,
      lgRetiradaLocal: this.contratoForm.get('taxaDeEntrega').value === 0 ? true : false,
      lgRevonacaoAutomatica: this.contratoForm.get('lgRevonacaoAutomatica').value,
      complementos: this.complementosSelecionados()
    };

    this.contratarPacoteService.contratarPacote(data).subscribe(result => {
      if (result.success) {
        this.contratoFinalizado = true;
      } else {
        this.toastr.error('Erro ao contratar pacote');
      }
    });
  }
  complementosSelecionados(): Array<[]> {
    const complementos = [];
    let categoriaSelecionada = '';
    this.pacote.categorias.forEach(categoria => {
      categoriaSelecionada = categoria.descricao;
      categoria.complementos.forEach(complementoSelecionado => {
        if (complementoSelecionado.quantidadeSelecionada > 0) {
          complementos.push(
            {
              idComplementoDaCategoria: complementoSelecionado.idComplementoDaCategoria,
              quantidade: complementoSelecionado.quantidadeSelecionada,
              idItensDoComplemento: complementoSelecionado.itensDoComplemento.length === 0 ? null :
                complementoSelecionado.itensDoComplemento
                  .filter(itemDoComplemento => itemDoComplemento.check)
                  .map(({ idItemDoComplemento }) => idItemDoComplemento)
            }
          );
        }
      });
    });
    return complementos;
  }

  voltarCadastroAdmin() {
    this.router.navigate([`./admin/clientes`]);
    this.cookieService.deleteAll();
  }

  clienteContratacaoPacote(): string {
    return (this.cookieService.get('admin') !== undefined && this.cookieService.get('admin') !== '') ?
      this.cookieService.get('admin') : this.idCurrentUser;
  }

  aplicarCupom(): void {

  }

}

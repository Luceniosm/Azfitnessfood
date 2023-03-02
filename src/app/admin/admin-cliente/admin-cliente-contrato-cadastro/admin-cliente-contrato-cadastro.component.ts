import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { BalaoConfirmacaoService } from 'src/app/shared/balao-confirmacao/balao-confirmacao.service';
import { ClienteFormaDePagamento } from '../admin-cliente-model/admin-cliente-contrato-forma-pagamento.model';
import { ClienteContrato } from '../admin-cliente-model/admin-cliente-contrato.model';
import { PacoteCategoriaComplemento } from '../admin-cliente-model/admin-cliente-pacote-categoria-complemento.model';
import { ItemDoComplemento } from '../admin-cliente-model/admin-cliente-pacote-categoria-item-complemento.model';
import { PacoteCategoria } from '../admin-cliente-model/admin-cliente-pacote-categoria.model';
import { ClientePacote } from '../admin-cliente-model/admin-cliente-pacote.models';
import { AdminClienteService } from '../admin-cliente.service';

@Component({
  selector: 'app-admin-cliente-contrato-cadastro',
  templateUrl: './admin-cliente-contrato-cadastro.component.html',
  styleUrls: ['./admin-cliente-contrato-cadastro.component.css']
})
export class AdminClienteContratoCadastroComponent implements OnInit, AfterViewInit {
  @Input() contrato: ClienteContrato;
  @Input() pacote: ClientePacote;
  @Input() formasDePagamento: Array<ClienteFormaDePagamento>;
  @Output() voltarEmit = new EventEmitter();
  editar = true;
  contratoForm: FormGroup;
  observacaoFormaDePagamento: string;
  constructor(
    private formBuilder: FormBuilder,
    private datepipe: DatePipe,
    private modalService: BsModalService,
    private balaoConfirmacaoService: BalaoConfirmacaoService,
    private toastr: ToastrService,
    private router: Router,
    private adminClienteService: AdminClienteService
  ) { }
  ngAfterViewInit(): void {
    if (this.editar) {
      this.carregarForm();
    }
    this.selecionarForma();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.contratoForm = this.formBuilder.group({
      idContratacaoPacote: [Guid.createEmpty().toString()],
      idUsuarioContratacaoPacote: [],
      idFormaDePagamento: ['', [Validators.required]],
      dataInicio: ['', [Validators.required]],
      observacao: [''],
      subTotal: [''],
      adicionalTotal: [''],
      taxaDeEntrega: [0],
      lgTermoAceito: [''],
      codigoCupom: [''],
      lgRevonacaoAutomatica: [false]
    });
  }

  incrementarComplemento(complemento: PacoteCategoriaComplemento, complementos: Array<PacoteCategoriaComplemento>): void {
    if (complemento.quantidadeSelecionada >= complemento.quantidadeMaxima) {
      return;
    }

    if (isNaN(complemento.quantidadeSelecionada)) {
      complemento.quantidadeSelecionada = 1;
    } else {
      complemento.quantidadeSelecionada++;
    }
  }

  decrementarComplemento(complemento: PacoteCategoriaComplemento, complementos: Array<PacoteCategoriaComplemento>): void {
    if (complemento.quantidadeSelecionada <= 0) {
      return;
    }

    if (isNaN(complemento.quantidadeSelecionada)) {
      complemento.quantidadeSelecionada = 0;
    } else {
      complemento.quantidadeSelecionada--;
    }
  }
  selecionarItemDoComplemento(complemento: PacoteCategoriaComplemento, idItemDoComplemento: string) {

    complemento.itensDoComplemento.forEach(element => {
      if (element.idItemDoComplemento === idItemDoComplemento) {
        element.check = !element.check;
      } else {
        element.check = false;
      }
    });
  }

  itensAtivos(itensDoComplemento: Array<ItemDoComplemento>): Array<ItemDoComplemento> {
    return itensDoComplemento.filter(_ => _.lgAtivo);
  }

  carregarForm() {
    this.contratoForm.patchValue({
      idContratacaoPacote: this.contrato.idContratacaoPacote,
      idUsuarioContratacaoPacote: this.contrato.idUsuarioContratacaoPacote,
      idFormaDePagamento: this.contrato.idFormaDePagamento,
      dataInicio: this.datepipe.transform(this.contrato.dataInicioPacote, 'yyyy-MM-dd'),
      observacao: this.contrato.pedidos[0].observacao,
      lgTermoAceito: true,
      taxaDeEntrega: this.contrato.lgRetiradaLocal ? 0 : this.pacote.taxaDeEntrega,
      lgRevonacaoAutomatica: this.contrato.lgRevonacaoAutomatica
    });
  }
  selecionarForma() {
    const idFormaDePagamento = this.contratoForm.get('idFormaDePagamento').value;
    const formaPagamento = this.formasDePagamento.find(el => el.idFormaDePagamento === idFormaDePagamento);
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

  calcularItensSelecionados(categorias: Array<PacoteCategoria>) {
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
    const formaPagamento = this.formasDePagamento.find(el => el.idFormaDePagamento === idFormaDePagamento);
    if (formaPagamento !== undefined) {
      return ((this.contratoForm.get('subTotal').value + this.contratoForm.get('adicionalTotal').value + this.contratoForm.get('taxaDeEntrega').value) * formaPagamento.porcentagemDeAcrescimo) / 100;
    }
    return 0;
  }
  calcularTotal(): number {
    return this.calcularSubTotal() + this.calcularAdicional() + this.contratoForm.get('taxaDeEntrega').value + this.calcularFormaDePagamento();
  }

  validarItensObrigatorios(): void {
    const mensagens = [];
    this.pacote.categorias.filter(categoria => categoria.lgOpcional === false).forEach(categoria => {
      const elementoSelecionado = categoria.complementos.filter(complemento => complemento.quantidadeSelecionada > 0);
      if (elementoSelecionado.length === 0) {
        mensagens.push(`selecione ${categoria.descricao}`);
      }
      elementoSelecionado.forEach(elemento => {
        if (elemento.itensDoComplemento.filter(fil => fil.lgAtivo).length > 0) {
          const checado = elemento.itensDoComplemento.filter(itemDoComplemento => itemDoComplemento.check);
          if (checado.length === 0) {
            mensagens.push(`selecione item de ${elemento.descricao}`);
          }
        }
      });

    });

    if (mensagens.length > 0) {
      mensagens.forEach(element => {
        this.toastr.warning(element);
      });

      return;
    }

    const data = {
      idContratacaoPacote: this.contratoForm.get('idContratacaoPacote').value,
      idPacote: this.pacote.idPacote,
      idFormaDePagamento: this.contratoForm.get('idFormaDePagamento').value,
      idTipoDoPacote: this.pacote.idTipoDoPacote,
      idUsuarioContratacaoPacote: this.contratoForm.get('idUsuarioContratacaoPacote').value,
      dataInicialPacote: this.contratoForm.get('dataInicio').value,
      observacao: this.contratoForm.get('observacao').value,
      valorContratado: this.calcularTotal(),
      consumacao: this.pacote.diasConsumacao,
      lgTermoAceito: this.contratoForm.get('lgTermoAceito').value,
      lgRetiradaLocal: this.contratoForm.get('taxaDeEntrega').value === 0 ? true : false,
      lgRevonacaoAutomatica: this.contratoForm.get('lgRevonacaoAutomatica').value,
      complementos: this.complementosSelecionados()
    };


    if (this.editar) {
      this.adminClienteService.atualizarContrato(data).subscribe(result => {
        if (result.success) {
          this.toastr.success('Contrato atualizado com sucesso!!!');
        } else {
          this.toastr.error('Erro ao contratar pacote');
        }
      });
    }
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

  voltar(): void {
    this.voltarEmit.emit();
  }
}

import { ItemContratadoSimples } from './pedido-item-contratado-simples';

export class DadosContratacaoPacote {
    idContratacaoPacote: string;
    idUsuarioContratacaoPacote: string;
    dataInclusao: string;
    dataValidade: string;
    titulo: string;
    quantidade: number;
    nomeUsuario: string;
    telefoneUsuario: string;
    nomeEntregador: string;
    telefoneEntregador: string;
    observacao: string;
    lgRevonacaoAutomatica: boolean;
    lgPacoteDiario: boolean;

    diasPedido: string[] = [];
    diasAntecipados: string[] = [];
    diasSuspensos: string[] = [];

    itensContratados: ItemContratadoSimples[] = [];
    itensAdicionaisContratados: ItemContratadoSimples[] = [];
  }

import { PacoteRenovacaoItem } from './pacote-renovacao-item-model';

export class PacoteRenovacao {
    idContratacaoPacote: string;
    idPacote: string;
    idTipoPacote: string;
    idFormaPagamento: string;
    observacoes: string;
    itens: PacoteRenovacaoItem[] = [];

    qtdePacoteAdicional: number;
    itensAdicionais: PacoteRenovacaoItem[] = [];
}

export class ContratacaoPacote {
    idPacote: string;
    idPagamentoPacote: string;
    idUsuarioContratacaoPacote: string;
    lgPago: boolean;
    valor: number;
    idUsuarioInclusao: string;

    ItensPacote: string[] = [];
    qtdePacoteAdicional: number;
    ItensPacoteAdicional: string[] = [];
    quantidadePacoteAdicional: 0;
    dataInicialPacote: string;
  }

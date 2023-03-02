import {PagamentoPacote} from './pacote-pagamento-pacote-model';
import { DetalheGrupoItem } from './pacote-detalhe-grupo-item-model';

export class PacoteDetalhe {
    idPacote: string;
    descricao: string;
    idTipoPacote: string;
    descricaoTipoPacote: string;
    quantidade: number;
    quantidadePacoteAdicional: number;
    lgAtivo: Boolean;
    idTermoCondicao: string;
    valorAdicional: number;
    dataInclusao: Date;
    idUsuarioInclusao: string;
    diasConsumacao: number;
    diasValidade: number;
    pagamentoPacote: PagamentoPacote[] = [];
    itensDetalhe: DetalheGrupoItem[] = [];
    itensAdicionaisDetalhe: DetalheGrupoItem[] = [];
  }

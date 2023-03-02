import { PacoteCategoria } from './admin-cliente-pacote-categoria.model';

export class ClientePacote {
  categorias: Array<PacoteCategoria>;
  descricao: string;
  diasConsumacao: number;
  diasValidade: number;
  idPacote: string;
  idTipoDoPacote: string;
  idTermoCondicao: string;
  idTipoPacote: string;
  lgAtivo: boolean;
  observacao: string;
  quantidade: number;
  taxaDeEntrega: number;
  titulo: string;
  valorAdicional: number;
}

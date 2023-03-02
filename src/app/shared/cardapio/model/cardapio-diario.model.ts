import { CardapioDiarioImagem } from './cardapio-diario-imagem.model';

export class CardapioDiario {
  idCardapio: string;
  opcao: number;
  titulo: string;
  descricao: string;
  ordem: number;
  dataPedido: Date;
  dataInclusao: Date;
  idUsuarioAlteracao: string;
  lgAtivo: boolean;
  lgPadrao: boolean;
  cardapioImagens: Array<CardapioDiarioImagem>;
}

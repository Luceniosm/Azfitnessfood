import { EntregadorCardapioDiarioImagem } from './entregador.cardapio-diario-imagem.model';
export class EntregadorCardapioDiario {
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
  cardapioImagens: Array<EntregadorCardapioDiarioImagem>;
}

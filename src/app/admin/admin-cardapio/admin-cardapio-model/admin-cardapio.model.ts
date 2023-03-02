import { AdminCardapioImagemModel } from './admin-cardapio-imagem.model';

export class AdminCardapioModel {
  idCardapio: string;
  opcao: string;
  titulo: string;
  descricao: string;
  dataPedido: Date;
  lgAtivo: boolean;
  ordem: number;
  cardapioImagens: Array<AdminCardapioImagemModel>;
  tags: Array<string>;
}

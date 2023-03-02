import { CategoriaDoPacote } from './contratar-pacote-categoria.model';
import { ImagemDoPacote } from './contratar-pacote-imagem.model';

export class Pacote {
  idPacote: string;
  idTipoDoPacote: string;
  tipoPacote: string;
  titulo: string;
  descricao: string;
  observacao: string;
  quantidade: number;
  valorAdicional: number;
  taxaDeEntrega: number;
  diasConsumacao: number;
  diasValidade: number;
  termosECondicoes: string;
  lgAtivo: boolean;
  imagemDoPacote: ImagemDoPacote;
  categorias: Array<CategoriaDoPacote>;
}

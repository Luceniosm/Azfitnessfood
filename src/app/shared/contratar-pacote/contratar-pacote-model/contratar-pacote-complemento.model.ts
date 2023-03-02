import { ItemDoComplemento } from './contratar-pacote-item-do-complemento.model';

export class ComplementoDaCategoria {
  idComplementoDaCategoria: string;
  idCategoriaDoPacote: string;
  descricao: string;
  valor: number;
  quantidadeMaxima: number;
  lgAtivo: boolean;
  quantidadeSelecionada: number;
  itensDoComplemento: Array<ItemDoComplemento>;
}

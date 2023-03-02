import { ItemDoComplemento } from './admin-cliente-pacote-categoria-item-complemento.model';

export class PacoteCategoriaComplemento {
  descricao: string;
  idCategoriaDoPacote: string;
  idComplementoDaCategoria: string;
  itensDoComplemento: Array<ItemDoComplemento>;
  lgAtivo: boolean;
  quantidadeMaxima: number;
  quantidadeSelecionada: number;
  valor: number;
}

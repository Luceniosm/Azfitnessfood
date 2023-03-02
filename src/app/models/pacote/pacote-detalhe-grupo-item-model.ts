import { ItemSimples } from './pacote-item-simples-model';
export class DetalheGrupoItem {
    idTipoItem: string;
    tipoItem: string;
    lgObrigatorio: boolean;
    ordem: number;
    items: ItemSimples[] = [];
  }

import { AdminPacoteItemDoComplemento } from './admin-pacote-item-do-complemento.model';
export class AdminPacoteComplementoDaCategoria {
  public idComplementoDaCategoria: string;
  public idCategoriaDoPacote: string;
  public descricao: string;
  public valor: number;
  public quantidadeMaxima: number;
  public peso: number;
  public lgAtivo: boolean;
  public itensDoComplemento: Array<AdminPacoteItemDoComplemento>;
}


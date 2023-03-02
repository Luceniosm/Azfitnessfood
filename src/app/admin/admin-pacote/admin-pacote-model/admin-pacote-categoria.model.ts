import { AdminPacoteComplementoDaCategoria } from './admin-pacote-complemento-da-categoria.model';

export class AdminPacoteCategoria {
  public idCategoriaDoPacote: string;
  public idPacote: string;
  public descricao: string;
  public lgAtivo: boolean;
  public lgOpcional: boolean;
  public ordem: number;
  public complementos: Array<AdminPacoteComplementoDaCategoria>;
}


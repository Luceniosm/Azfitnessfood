import { PacoteCategoriaComplemento } from './admin-cliente-pacote-categoria-complemento.model';

export class PacoteCategoria {
  complementos: Array<PacoteCategoriaComplemento>;
  descricao: string;
  idCategoriaDoPacote: string;
  idPacote: string;
  lgAtivo: boolean;
  lgOpcional: boolean;
  ordem: number;
}

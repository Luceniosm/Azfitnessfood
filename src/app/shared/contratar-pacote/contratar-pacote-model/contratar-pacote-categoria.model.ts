import { ComplementoDaCategoria } from './contratar-pacote-complemento.model';

export class CategoriaDoPacote {
  idCategoriaDoPacote: string;
  idPacote: string;
  descricao: string;
  lgAtivo: boolean;
  lgOpcional: boolean;
  ordem: number;
  complementos: Array<ComplementoDaCategoria>;
}

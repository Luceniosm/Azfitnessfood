export class PacoteResumido {
  public idPacote: string;
  public titulo: string;
  public tipo: string;
  public quantidade: number;
  public diasValidade: string;
  public lgAtivo: boolean;
  public dataInclusao: Date;
  public categorias: Array<string>;
}

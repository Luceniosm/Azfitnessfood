export class AdminCardapioImagemModel {
  imagem: string;
  nome: string;
  mimeType: string;

  constructor(imagem: string, nome: string, mimeType: string) {
    this.imagem = imagem;
    this.nome = nome;
    this.mimeType = mimeType;
  }
}

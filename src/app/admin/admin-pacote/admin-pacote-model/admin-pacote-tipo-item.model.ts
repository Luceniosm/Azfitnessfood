import { AdminPacoteItem } from './admin-pacote-item.model';

export class AdminPacoteTipoItem {
    public idTipoItem: string;
    public descricao: string;
    public ordem: number;
    public lgAtivo: boolean;
    public lgObrigatorio: boolean;
    public dataInclusao: Date;
    public items: Array<AdminPacoteItem>;
}

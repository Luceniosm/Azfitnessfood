import { ClienteEnderecoModel } from '../cliente/cliente-endereco.model';
import { PerfilModel } from './perfil.model';

export class UserModel {
    celular: string;
    cpfCnpj: string;
    dtNascimento: Date;
    email: string;
    enderecos: Array<ClienteEnderecoModel>;
    idIdentityUser: number;
    idUsuario: string;
    idUsuarioPerfil: string;
    nome: string;
    perfil: PerfilModel;
    telefone: string;
}

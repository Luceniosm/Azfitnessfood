import { ClienteEndereco } from './admin-cliente-endereco.model';

export class ClienteCadastro {
    idUsuario: string;
    nome: string;
    cpfCnpj: string;
    dtNascimento: Date;
    email: string;
    telefone: string;
    celular: string;
    enderecos:  Array<ClienteEndereco>;
}

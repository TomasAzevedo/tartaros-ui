import { Endereco } from "./endereco";

export class Cliente {

    public id: number;
    public nome: string;
    public telefone: string;
    public email: string;
    public cpf: string;
    public dataNascimento: Date;
    public enderecos: Endereco[] = new Array();

    constructor() {
    }

}

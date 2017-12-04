import { Endereco } from "./endereco";
import { TipoComplemento } from "./tipo-complemento";

export class Complemento {

    public id: number;
    public nome: string;
    public descricao: string;
    public valor: number;
    public tipoComplemento: TipoComplemento = new TipoComplemento();

    constructor() {
    }

}

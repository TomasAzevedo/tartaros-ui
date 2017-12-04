import { Categoria } from './categoria';
import { Complemento } from './complemento';

export class Produto {

    public id: number;
    public nome: string;
    public descricao: string;
    public valor: number;
    public emFalta: boolean;
    public categoria: Categoria = new Categoria();
    public listaComplementos: Complemento[] = new Array();

    constructor() {
    }

}

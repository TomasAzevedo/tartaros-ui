import { environment } from './../../environments/environment';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Cliente } from '../core/model/cliente';

export class ClienteFiltro {

    nome: string;
    telefone: string;
    email: string;
    cpf: string;
    pagina = 0;
    qtdPorPagina = 5;
    listar = false;
}

@Injectable()
export class ClienteService {

    private url: string;

    constructor(private http: AuthHttp) {
        this.url = `${environment.apiUrl}/clientes`;
    }


    pesquisar(filtro: ClienteFiltro): Promise<any> {

        const params = new URLSearchParams();
        params.set('page', filtro.pagina.toString());
        params.set('size', filtro.qtdPorPagina.toString());

        if (filtro.nome) {
            params.set('nome', filtro.nome);
        }

        if (filtro.telefone) {
            params.set('telefone', filtro.nome);
        }

        if (filtro.email) {
            params.set('email', filtro.nome);
        }

        if (filtro.cpf) {
            params.set('cpf', filtro.nome);
        }

        return this.http.get(`${this.url}`, { search: params })
            .toPromise()
            .then(response => {
                const pessoas = response.json().content;
                const resultado = {
                    pessoas: pessoas,
                    total: response.json().totalElements
                }
                return resultado;
            });

    }


    listarTodos(): Promise<any> {

        return this.http.get(`${this.url}`)
            .toPromise()
            .then(response => {
                return response.json().content;
            });

    }


    excluir(codigo: number): Promise<void> {

        return this.http.delete(`${this.url}/${codigo}`).toPromise().then(() => null);
    }


    adicionar(cliente: Cliente): Promise<Cliente> {

        return this.http.post(this.url, JSON.stringify(cliente))
            .toPromise()
            .then(response => response.json());
    }


    atualizar(cliente: Cliente): Promise<Cliente> {

        return this.http.put(`${this.url}/${cliente.id}`,
            JSON.stringify(cliente))
            .toPromise()
            .then(response => {
                return response.json() as Cliente;
            });
    }


    buscarPorCodigo(codigo: number): Promise<Cliente> {

        return this.http.get(`${this.url}/${codigo}`)
            .toPromise()
            .then(response => {
                return response.json() as Cliente;
            });
    }

}

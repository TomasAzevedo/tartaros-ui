import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { Produto } from '../core/model/produto';


@Injectable()
export class ProdutoService {

    private url: string;

    constructor(private http: AuthHttp) {
        this.url = `${environment.apiUrl}/cardapio/produtos`;
    }


    listarTodos(): Promise<any> {

        return this.http.get(`${this.url}`)
            .toPromise()
            .then(response => {
                return response.json();
            });

    }


    excluir(codigo: number): Promise<void> {

        return this.http.delete(`${this.url}/${codigo}`).toPromise().then(() => null);
    }


    adicionar(produto: Produto): Promise<Produto> {

        return this.http.post(this.url, JSON.stringify(produto))
            .toPromise()
            .then(response => response.json());
    }


    atualizar(produto: Produto): Promise<Produto> {

        return this.http.put(`${this.url}/${produto.id}`,
            JSON.stringify(produto))
            .toPromise()
            .then(response => {
                return response.json() as Produto;
            });
    }


    buscarPorCodigo(codigo: number): Promise<Produto> {

        return this.http.get(`${this.url}/${codigo}`)
            .toPromise()
            .then(response => {
                return response.json() as Produto;
            });
    }

}

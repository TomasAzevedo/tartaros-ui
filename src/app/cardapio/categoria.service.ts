import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { Categoria } from '../core/model/categoria';


@Injectable()
export class CategoriaService {

    private url: string;

    constructor(private http: AuthHttp) {
        this.url = `${environment.apiUrl}/cardapio/produtos/categorias`;
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


    adicionar(categoria: Categoria): Promise<Categoria> {

        return this.http.post(this.url, JSON.stringify(categoria))
            .toPromise()
            .then(response => response.json());
    }


    atualizar(categoria: Categoria): Promise<Categoria> {

        return this.http.put(`${this.url}/${categoria.id}`,
            JSON.stringify(categoria))
            .toPromise()
            .then(response => {
                return response.json() as Categoria;
            });
    }


    buscarPorCodigo(codigo: number): Promise<Categoria> {

        return this.http.get(`${this.url}/${codigo}`)
            .toPromise()
            .then(response => {
                return response.json() as Categoria;
            });
    }

}

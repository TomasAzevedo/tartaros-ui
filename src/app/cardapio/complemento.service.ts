import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { Complemento } from '../core/model/complemento';


@Injectable()
export class ComplementoService {

    private url: string;

    constructor(private http: AuthHttp) {
        this.url = `${environment.apiUrl}/cardapio/complementos`;
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


    adicionar(complemento: Complemento): Promise<Complemento> {

        return this.http.post(this.url, JSON.stringify(complemento))
            .toPromise()
            .then(response => response.json());
    }


    atualizar(complemento: Complemento): Promise<Complemento> {

        return this.http.put(`${this.url}/${complemento.id}`,
            JSON.stringify(complemento))
            .toPromise()
            .then(response => {
                return response.json() as Complemento;
            });
    }


    buscarPorCodigo(codigo: number): Promise<Complemento> {

        return this.http.get(`${this.url}/${codigo}`)
            .toPromise()
            .then(response => {
                return response.json() as Complemento;
            });
    }

}

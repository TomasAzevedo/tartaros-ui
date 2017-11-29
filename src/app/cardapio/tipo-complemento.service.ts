import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { TipoComplemento } from '../core/model/tipo-complemento';


@Injectable()
export class TipoComplementoService {

    private url: string;

    constructor(private http: AuthHttp) {
        this.url = `${environment.apiUrl}/cardapio/complementos/tipo`;
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


    adicionar(tipoComplemento: TipoComplemento): Promise<TipoComplemento> {

        return this.http.post(this.url, JSON.stringify(tipoComplemento))
            .toPromise()
            .then(response => response.json());
    }


    atualizar(tipoComplemento: TipoComplemento): Promise<TipoComplemento> {

        return this.http.put(`${this.url}/${tipoComplemento.id}`,
            JSON.stringify(tipoComplemento))
            .toPromise()
            .then(response => {
                return response.json() as TipoComplemento;
            });
    }


    buscarPorCodigo(codigo: number): Promise<TipoComplemento> {

        return this.http.get(`${this.url}/${codigo}`)
            .toPromise()
            .then(response => {
                return response.json() as TipoComplemento;
            });
    }

}

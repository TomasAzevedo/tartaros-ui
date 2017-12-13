import { Status } from './../core/model/status';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { Categoria } from '../core/model/categoria';


@Injectable()
export class StatusService {

    private url: string;

    constructor(private http: AuthHttp) {
        this.url = `${environment.apiUrl}/pedidos/status`;
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


    adicionar(status: Status): Promise<Categoria> {

        return this.http.post(this.url, JSON.stringify(status))
            .toPromise()
            .then(response => response.json());
    }


    atualizar(status: Status): Promise<Status> {

        return this.http.put(`${this.url}/${status.id}`,
            JSON.stringify(status))
            .toPromise()
            .then(response => {
                return response.json() as Status;
            });
    }


    buscarPorCodigo(codigo: number): Promise<Status> {

        return this.http.get(`${this.url}/${codigo}`)
            .toPromise()
            .then(response => {
                return response.json() as Status;
            });
    }

}

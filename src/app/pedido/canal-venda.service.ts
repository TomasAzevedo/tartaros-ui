import { CanalVenda } from './../core/model/canal-venda';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';


@Injectable()
export class CanalVendaService {

    private url: string;

    constructor(private http: AuthHttp) {
        this.url = `${environment.apiUrl}/pedidos/canais-venda`;
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


    adicionar(canalVenda: CanalVenda): Promise<CanalVenda> {

        return this.http.post(this.url, JSON.stringify(canalVenda))
            .toPromise()
            .then(response => response.json());
    }


    atualizar(canalVenda: CanalVenda): Promise<CanalVenda> {

        return this.http.put(`${this.url}/${canalVenda.id}`,
            JSON.stringify(canalVenda))
            .toPromise()
            .then(response => {
                return response.json() as CanalVenda;
            });
    }


    buscarPorCodigo(codigo: number): Promise<CanalVenda> {

        return this.http.get(`${this.url}/${codigo}`)
            .toPromise()
            .then(response => {
                return response.json() as CanalVenda;
            });
    }

}

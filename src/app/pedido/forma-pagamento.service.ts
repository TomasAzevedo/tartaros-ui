import { FormaPagamento } from './../core/model/forma-pagamento';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';


@Injectable()
export class FormaPagamentoService {

    private url: string;

    constructor(private http: AuthHttp) {
        this.url = `${environment.apiUrl}/pedidos/formas-pagamento`;
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


    adicionar(formaPagamento: FormaPagamento): Promise<FormaPagamento> {

        return this.http.post(this.url, JSON.stringify(formaPagamento))
            .toPromise()
            .then(response => response.json());
    }


    atualizar(formaPagamento: FormaPagamento): Promise<FormaPagamento> {

        return this.http.put(`${this.url}/${formaPagamento.id}`,
            JSON.stringify(formaPagamento))
            .toPromise()
            .then(response => {
                return response.json() as FormaPagamento;
            });
    }


    buscarPorCodigo(codigo: number): Promise<FormaPagamento> {

        return this.http.get(`${this.url}/${codigo}`)
            .toPromise()
            .then(response => {
                return response.json() as FormaPagamento;
            });
    }

}

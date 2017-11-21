import { environment } from './../../environments/environment';
import { JwtHelper } from 'angular2-jwt';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

    private oauthTokenUrl: string;
    jwtPayload: any;

    constructor(private http: Http,
                private jwtHelper: JwtHelper) {

        this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
        this.carregarToken();

    }

    login(usuario: string, senha: string): Promise<void> {

        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Basic dGFydGFyb3NfYW5ndWxhcjp0YXJ0YXJvc19Abmd1bEByMA==');

        const body = `username=${usuario}&password=${senha}&grant_type=password`;

        return this.http
            .post(this.oauthTokenUrl, body, { headers, withCredentials: true })
            .toPromise()
            .then(response => {

                this.armazenarToken(response.json().access_token);
            })
            .catch(response => {

                if(response.status === 400) {

                    const responseJson = response.json();

                    if(responseJson.error === 'invalid_grant') {
                        return Promise.reject('Usuário ou senha inválida.');
                    }
                }

                return Promise.reject(response);

            });

    }


    private armazenarToken(token: string) {

        this.jwtPayload = this.jwtHelper.decodeToken(token);
        localStorage.setItem('tartaros_token', token);

    }


    private carregarToken() {

        const token = localStorage.getItem('tartaros_token');

        if (token) {
            this.armazenarToken(token);
        }

    }


    temPermissao(permissao: string) {

        return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);

    }


    temQualquerPermissao(permissoes) {

        for(const permissao of permissoes) {

            if(this.temPermissao(permissao)) {
                return true;
            }

        }

    }


    obrerNovoAccessToken() : Promise<void> {

        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Basic dGFydGFyb3NfYW5ndWxhcjp0YXJ0YXJvc19Abmd1bEByMA==');

        const body = 'grant_type=refresh_token';

        return this.http
            .post(this.oauthTokenUrl, body, {headers: headers, withCredentials: true})
            .toPromise()
            .then(response => {

                this.armazenarToken(response.json().access_token);
                console.log('Access Token renovado.');
                return Promise.resolve(null);
            })
            .catch(response => {
                console.log('Erro ao renovar token.', response);
                return Promise.resolve(null);
            });
    }


    isAccessTokenInvalido() {

        const token = localStorage.getItem('tartaros_token');
        return !token || this.jwtHelper.isTokenExpired(token);
    }


    limparAccesToken() {
        localStorage.removeItem('tartaros_token');
        this.jwtPayload = null;
    }


}

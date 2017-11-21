import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttpError } from 'angular2-jwt';
import { Router } from '@angular/router';
import { NotAuthenticatedError } from '../seguranca/seguranca-http';
import { ToastService } from 'ng-mdb-pro/pro/alerts';

@Injectable()
export class ErrorHandlerService {

    constructor(private toast: ToastService,
                private router: Router,) { }

    handle(errorResponse: any) {

        let msg: string;

        if (typeof errorResponse === 'string') {

            msg = errorResponse;

        } else if(errorResponse instanceof NotAuthenticatedError) {

            msg = 'Sua sessão expirou, faça login novamente.';
            this.router.navigate(['/login']);

        } else if ((errorResponse instanceof Response &&
                    errorResponse.status >= 400 && errorResponse.status <= 499)) {

            let errors;
            msg = 'Ocorreu um erro ao processar a sua solicitação.';

            if(errorResponse.status === 403) {
                msg = 'Você não tem permissão para executar esta ação.'
            }

            try {

                errors = errorResponse.json();
                msg = errors[0].mensagemUsuario;

            } catch (e) { }

            console.error('Ocorreu um erro', errorResponse);

        } else {

            msg = 'Erro ao acessar o serviço remoto.';
            console.log('Ocorreu um erro', errorResponse);
        }

        let options = { positionClass: 'toast-bottom-right' };
        this.toast.error(msg, '', options);

    }

}

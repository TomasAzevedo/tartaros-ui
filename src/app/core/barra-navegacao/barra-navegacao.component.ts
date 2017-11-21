import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../seguranca/auth.service';
import { LogoutService } from '../../seguranca/logout.service';
import { ErrorHandlerService } from '../error-handler.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-barra-navegacao',
    templateUrl: './barra-navegacao.component.html',
    styleUrls: ['./barra-navegacao.component.scss']
})
export class BarraNavegacaoComponent implements OnInit {

    constructor(public auth: AuthService,
        private logoutService: LogoutService,
        private errorHandler: ErrorHandlerService,
        private router: Router) {


    }

    ngOnInit() {
    }

    logout() {
        this.logoutService
            .logout()
            .then(() => {
                this.router.navigate(['/login']);
            })
            .catch(erro => this.errorHandler.handle(erro));
    }

}

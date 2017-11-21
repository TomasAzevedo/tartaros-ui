import { MDBSpinningPreloader } from 'ng-mdb-pro';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LoginFormComponent implements OnInit {

    constructor(private auth: AuthService,
                private errorHandler: ErrorHandlerService,
                private router: Router) { }

    ngOnInit() {
    }


    login(usuario: string, senha: string) {
        this.auth
            .login(usuario, senha)
            .then(() => {
                this.router.navigate(['/clientes']);
            })
            .catch(erro => {
                this.errorHandler.handle(erro)
            });
    }

}

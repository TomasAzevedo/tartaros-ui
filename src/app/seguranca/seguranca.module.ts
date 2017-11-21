import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { SegurancaHttp } from './seguranca-http';
import { AuthService } from './auth.service';
import { Http, RequestOptions, BrowserXhr } from '@angular/http';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { LoginFormComponent } from './login-form/login-form.component';
import { NaoAutorizadoComponent } from './nao-autorizado/nao-autorizado.component';
import { AuthGuard } from './auth.guard';
import { LogoutService } from './logout.service';
import { NgProgressBrowserXhr } from 'ngx-progressbar';

export function authHttpServiceFactory(authService: AuthService, http: Http, options: RequestOptions): AuthHttp {

    const config = new AuthConfig({
        globalHeaders: [
            { 'Content-Type': 'application/json' }
        ],
        tokenName: 'tartaros_token',
        tokenGetter: (() => localStorage.getItem('tartaros_token'))
    });

    return new SegurancaHttp(authService, config, http, options);
}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        SegurancaRoutingModule
    ],
    declarations: [LoginFormComponent, NaoAutorizadoComponent],
    providers: [
        { provide: BrowserXhr, useClass: NgProgressBrowserXhr },
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [AuthService, Http, RequestOptions]
        },
        AuthGuard,
        LogoutService
    ]
})
export class SegurancaModule { }

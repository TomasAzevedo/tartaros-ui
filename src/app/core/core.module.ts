import { SharedModule } from './../shared/shared.module';
import { BarraNavegacaoComponent } from './barra-navegacao/barra-navegacao.component';
import { NgModule, LOCALE_ID, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { ErrorHandlerService } from './error-handler.service';
import { AuthService } from '../seguranca/auth.service';
import { JwtHelper } from 'angular2-jwt';
import { RouterModule } from '@angular/router';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule
    ],
    declarations: [PaginaNaoEncontradaComponent, BarraNavegacaoComponent],
    exports: [BarraNavegacaoComponent],
    providers: [
        ErrorHandlerService,
        {provide: LOCALE_ID, useValue: 'pt-BR'},
        AuthService,
        JwtHelper
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CoreModule { }

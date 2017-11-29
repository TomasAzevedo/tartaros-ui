import { ToastModule } from 'ng-mdb-pro/pro/alerts';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgProgressModule } from 'ngx-progressbar';
import { MDBBootstrapModules, MDBSpinningPreloader } from 'ng-mdb-pro';
import { NgxMaskModule } from 'ngx-mask';
import { NgxBrModule } from 'ngx-br';
import { MensagemErroComponent } from './mensagem-erro/mensagem-erro.component';
import { ValidacaoHelperServiceService } from './validacao-helper-service.service';

@NgModule({
    imports: [
        CommonModule,
        MDBBootstrapModules.forRoot(),
        ToastModule.forRoot(),
        DataTableModule,
        ReactiveFormsModule,
        FormsModule,
        NgProgressModule,
        NgxMaskModule.forRoot(),
        NgxBrModule.forRoot()
    ],
    declarations: [
        MensagemErroComponent,
    ],
    exports: [
        MDBBootstrapModules,
        ToastModule,
        DataTableModule,
        ReactiveFormsModule,
        FormsModule,
        NgProgressModule,
        NgxMaskModule,
        NgxBrModule,
        MensagemErroComponent,
    ],
    providers: [
        MDBSpinningPreloader,
        ValidacaoHelperServiceService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SharedModule { }

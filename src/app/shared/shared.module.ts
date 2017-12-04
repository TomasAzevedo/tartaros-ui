import { ToastModule } from 'ng-mdb-pro/pro/alerts';
import { NgModule, NO_ERRORS_SCHEMA, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgProgressModule } from 'ngx-progressbar';
import { MDBBootstrapModules, MDBSpinningPreloader } from 'ng-mdb-pro';
import { NgxMaskModule } from 'ngx-mask';
import { NgxBrModule } from 'ngx-br';
import { MensagemErroComponent } from './mensagem-erro/mensagem-erro.component';
import { ValidacaoHelperServiceService } from './validacao-helper-service.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import ptBr from '@angular/common/locales/pt';

registerLocaleData(ptBr);

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
        NgxBrModule.forRoot(),
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
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
    ],
    providers: [
        MDBSpinningPreloader,
        ValidacaoHelperServiceService,
        { provide: LOCALE_ID, useValue: 'pt-BR' }
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SharedModule { }

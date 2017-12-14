import { ConversorData } from './conversor-data';
import { ToastModule } from 'ng-mdb-pro/pro/alerts';
import { NgModule, NO_ERRORS_SCHEMA, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgProgressModule } from 'ngx-progressbar';
import { MDBBootstrapModules, MDBSpinningPreloader } from 'ng-mdb-pro';
import { NgxMaskModule } from 'ngx-mask';
import { NgxBrModule } from 'ngx-br';
import { ValidacaoHelperServiceService } from './validacao-helper-service.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import ptBr from '@angular/common/locales/pt';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDateFormats, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';

registerLocaleData(ptBr);

const MY_DATE_FORMATS:MatDateFormats = {
    parse: {
        dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
    },
    display: {
        dateInput: 'input',
        monthYearLabel: {year: 'numeric', month: 'short'},
        dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
        monthYearA11yLabel: {year: 'numeric', month: 'long'},
    }
};
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
        MatDatepickerModule,
        MatNativeDateModule
    ],
    declarations: [
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
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    providers: [
        MDBSpinningPreloader,
        ValidacaoHelperServiceService,
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        {provide: DateAdapter, useClass: ConversorData},
        {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SharedModule { }

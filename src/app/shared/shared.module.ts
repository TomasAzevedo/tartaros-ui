import { ToastModule } from 'ng-mdb-pro/pro/alerts';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgProgressModule } from 'ngx-progressbar';
import { MDBBootstrapModules, MDBSpinningPreloader } from 'ng-mdb-pro';

@NgModule({
    imports: [
        CommonModule,
        MDBBootstrapModules.forRoot(),
        ToastModule.forRoot(),
        DataTableModule,
        ReactiveFormsModule,
        FormsModule,
        NgProgressModule
    ],
    declarations: [

    ],
    exports: [
        MDBBootstrapModules,
        ToastModule,
        DataTableModule,
        ReactiveFormsModule,
        FormsModule,
        NgProgressModule
    ],
    providers: [
        MDBSpinningPreloader
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SharedModule { }

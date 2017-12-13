import { StatusService } from './status.service';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoRoutingModule } from './pedido-routing.module';
import { StatusComponent } from './status/status.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        PedidoRoutingModule
    ],
    declarations: [

        StatusComponent],
    providers: [
        StatusService
    ]
})
export class PedidoModule { }

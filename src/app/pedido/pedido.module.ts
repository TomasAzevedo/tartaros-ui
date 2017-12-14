import { CoreModule } from './../core/core.module';
import { StatusService } from './status.service';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoRoutingModule } from './pedido-routing.module';
import { StatusComponent } from './status/status.component';
import { FormaPagamentoComponent } from './forma-pagamento/forma-pagamento.component';
import { FormaPagamentoService } from './forma-pagamento.service';
import { CanalVendaComponent } from './canal-venda/canal-venda.component';
import { CanalVendaService } from './canal-venda.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        CoreModule,
        PedidoRoutingModule
    ],
    declarations: [
        StatusComponent,
        FormaPagamentoComponent,
        CanalVendaComponent
    ],
    providers: [
        StatusService,
        FormaPagamentoService,
        CanalVendaService
    ]
})
export class PedidoModule { }

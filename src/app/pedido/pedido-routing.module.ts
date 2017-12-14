import { FormaPagamentoComponent } from './forma-pagamento/forma-pagamento.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';
import { StatusComponent } from './status/status.component';
import { CanalVendaComponent } from './canal-venda/canal-venda.component';

const routes: Routes = [
    {
        path: 'pedido/status',
        component: StatusComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_PESQUISAR_STATUS', 'ROLE_CADASTRAR_STATUS', 'ROLE_REMOVER_STATUS'] }
    },
    {
        path: 'pedido/formas-pagamento',
        component: FormaPagamentoComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_PESQUISAR_FORMA_PGTO', 'ROLE_CADASTRAR_FORMA_PGTO', 'ROLE_REMOVER_FORMA_PGTO'] }
    },
    {
        path: 'pedido/canais-venda',
        component: CanalVendaComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_PESQUISAR_CANAL_VENDA', 'ROLE_CADASTRAR_CANAL_VENDA', 'ROLE_REMOVER_CANAL_VENDA'] }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoRoutingModule { }

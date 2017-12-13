import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';
import { StatusComponent } from './status/status.component';

const routes: Routes = [
    {
        path: 'pedido/status',
        component: StatusComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_PESQUISAR_STATUS', 'ROLE_CADASTRAR_STATUS', 'ROLE_REMOVER_STATUS'] }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoRoutingModule { }

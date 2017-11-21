import { FormClienteComponent } from './form-cliente/form-cliente.component';
import { PesquisaClientesComponent } from './pesquisa-clientes/pesquisa-clientes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
    {
        path: 'clientes',
        component: PesquisaClientesComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_PESQUISAR_CLIENTES'] }
    },
    {
        path: 'clientes/novo',
        component: FormClienteComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CADASTRAR_CLIENTES'] }
    },
    {
        path: 'clientes/:codigo',
        component: FormClienteComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CADASTRAR_CLIENTES'] }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }

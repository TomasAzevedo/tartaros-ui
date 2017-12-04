import { CategoriasComponent } from './categorias/categorias.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';
import { TipoComplementoComponent } from './tipo-complemento/tipo-complemento.component';
import { ComplementoPesquisaComponent } from './complemento-pesquisa/complemento-pesquisa.component';
import { ComplementoFormComponent } from './complemento-form/complemento-form.component';

const routes: Routes = [
    {
        path: 'cardapio/categorias',
        component: CategoriasComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_PESQUISAR_CATEGORIAS'] }
    },
    {
        path: 'cardapio/complementos/tipos',
        component: TipoComplementoComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_PESQUISAR_TIPO_COMPLEMENTOS'] }
    },
    {
        path: 'cardapio/complementos',
        component: ComplementoPesquisaComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_PESQUISAR_COMPLEMENTOS'] }
    },
    {
        path: 'cardapio/complementos/novo',
        component: ComplementoFormComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CADASTRAR_COMPLEMENTOS'] }
    },
    {
        path: 'cardapio/complementos/:id',
        component: ComplementoFormComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_PESQUISAR_COMPLEMENTOS'] }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardapioRoutingModule { }

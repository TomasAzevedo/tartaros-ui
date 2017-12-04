import { ProdutoFormComponent } from './produto-form/produto-form.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';
import { TipoComplementoComponent } from './tipo-complemento/tipo-complemento.component';
import { ComplementoPesquisaComponent } from './complemento-pesquisa/complemento-pesquisa.component';
import { ComplementoFormComponent } from './complemento-form/complemento-form.component';
import { ProdutoPesquisaComponent } from './produto-pesquisa/produto-pesquisa.component';

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
    },
    {
        path: 'cardapio/produtos',
        component: ProdutoPesquisaComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_PESQUISAR_PRODUTOS'] }
    },
    {
        path: 'cardapio/produtos/novo',
        component: ProdutoFormComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CADASTRAR_PRODUTOS'] }
    },
    {
        path: 'cardapio/produtos/:id',
        component: ProdutoFormComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_PESQUISAR_PRODUTOS'] }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardapioRoutingModule { }

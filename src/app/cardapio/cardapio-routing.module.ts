import { CategoriasComponent } from './categorias/categorias.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';
import { TipoComplementoComponent } from './tipo-complemento/tipo-complemento.component';

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
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardapioRoutingModule { }

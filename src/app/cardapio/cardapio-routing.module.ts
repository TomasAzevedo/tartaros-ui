import { CategoriasComponent } from './categorias/categorias.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
    {
        path: 'cardapio/categorias',
        component: CategoriasComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_PESQUISAR_CATEGORIAS'] }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardapioRoutingModule { }

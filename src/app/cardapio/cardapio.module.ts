import { ProdutoService } from './produto.service';
import { ComplementoService } from './complemento.service';
import { TipoComplementoService } from './tipo-complemento.service';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardapioRoutingModule } from './cardapio-routing.module';
import { CategoriasComponent } from './categorias/categorias.component';
import { CategoriaService } from './categoria.service';
import { TipoComplementoComponent } from './tipo-complemento/tipo-complemento.component';
import { ComplementoPesquisaComponent } from './complemento-pesquisa/complemento-pesquisa.component';
import { ComplementoFormComponent } from './complemento-form/complemento-form.component';
import { ProdutoPesquisaComponent } from './produto-pesquisa/produto-pesquisa.component';
import { ProdutoFormComponent } from './produto-form/produto-form.component';

@NgModule({
    imports: [
        CommonModule,
        CardapioRoutingModule,
        SharedModule,
    ],
    declarations: [
        CategoriasComponent,
        TipoComplementoComponent,
        ComplementoPesquisaComponent,
        ComplementoFormComponent,
        ProdutoPesquisaComponent,
        ProdutoFormComponent
    ],
    providers: [
        CategoriaService,
        TipoComplementoService,
        ComplementoService,
        ProdutoService
    ]
})
export class CardapioModule { }

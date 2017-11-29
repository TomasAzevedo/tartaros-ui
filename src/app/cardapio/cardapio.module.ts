import { TipoComplementoService } from './tipo-complemento.service';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardapioRoutingModule } from './cardapio-routing.module';
import { CategoriasComponent } from './categorias/categorias.component';
import { CategoriaService } from './categoria.service';
import { TipoComplementoComponent } from './tipo-complemento/tipo-complemento.component';

@NgModule({
    imports: [
        CommonModule,
        CardapioRoutingModule,
        SharedModule,
    ],
    declarations: [CategoriasComponent, TipoComplementoComponent],
    providers: [
        CategoriaService,
        TipoComplementoService
    ]
})
export class CardapioModule { }

import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardapioRoutingModule } from './cardapio-routing.module';
import { CategoriasComponent } from './categorias/categorias.component';
import { CategoriaService } from './categoria.service';

@NgModule({
  imports: [
    CommonModule,
    CardapioRoutingModule,
    SharedModule,
  ],
  declarations: [CategoriasComponent],
  providers: [CategoriaService]
})
export class CardapioModule { }

import { SharedModule } from './../shared/shared.module';
import { ClienteService } from './cliente.service';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { FormClienteComponent } from './form-cliente/form-cliente.component';
import { PesquisaClientesComponent } from './pesquisa-clientes/pesquisa-clientes.component';


@NgModule({
  imports: [
    CommonModule,
    ClienteRoutingModule,
    SharedModule
  ],
  declarations: [FormClienteComponent, PesquisaClientesComponent],
  exports: [],
  providers: [
      ClienteService
  ],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class ClienteModule { }

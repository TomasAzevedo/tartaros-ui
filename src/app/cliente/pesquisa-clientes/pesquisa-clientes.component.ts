import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from '../../core/model/cliente';
import { ClienteService } from '../cliente.service';

@Component({
    selector: 'app-pesquisa-clientes',
    templateUrl: './pesquisa-clientes.component.html',
    styleUrls: ['./pesquisa-clientes.component.scss']
})
export class PesquisaClientesComponent implements OnInit {

    @ViewChild('modalConfirmacao') public modal;

    clientes: Cliente[];
    cliente: Cliente = new Cliente();
    excluindo: Boolean = false;
    excluidoComSucesso: Boolean = false;

    constructor(private clienteService: ClienteService,
                private errorHandlerService: ErrorHandlerService) {

    }


    ngOnInit() {
        this.listarTodos();
    }


    listarTodos() {

        this.clienteService
            .listarTodos()
            .then((clientes) => {
                this.clientes = clientes;
            })
            .catch(error => this.errorHandlerService.handle(error));

    }


    confimrarExclusao(cliente: Cliente) {
        this.cliente = cliente;
        this.modal.show();
    }


    excluir() {

        this.excluindo = true;
        this.clienteService
            .excluir(this.cliente.id)
            .then(() => {

                this.cliente = new Cliente();
                this.excluidoComSucesso = true;
                this.excluindo = false;
                this.listarTodos();
                setTimeout(() => {
                    this.modal.hide();
                    setTimeout(() => {
                        this.excluidoComSucesso = false;
                    },1000);
                },2500);
            })
            .catch(error => {
                this.excluindo = false;
                this.errorHandlerService.handle(error)
            });
    }

}

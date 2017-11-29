import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from '../../core/model/cliente';
import { ClienteService } from '../cliente.service';
import { Title } from '@angular/platform-browser';

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
    valorContagemRegressiva: number;

    constructor(private clienteService: ClienteService,
        private errorHandlerService: ErrorHandlerService,
        private title: Title) {

    }


    ngOnInit() {

        this.title.setTitle('Clientes');

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

                this.excluidoComSucesso = true;
                this.excluindo = false;
                //this.listarTodos();
                this.removerDaLista(this.cliente);
                this.cliente = new Cliente();
                this.executarContagemRegressiva(2500, ()=>{
                    this.modal.hide();
                    setTimeout(() => {
                        this.excluidoComSucesso = false;
                    }, 1000);
                });
            })
            .catch(error => {
                this.excluindo = false;
                this.errorHandlerService.handle(error)
            });
    }

    removerDaLista(cliente: Cliente) {
        let index = this.clientes.indexOf(this.cliente);
        this.clientes = this.clientes.filter((val, i) => i != index);
    }


    executarContagemRegressiva(tempoTotal: number, acao) {

        this.valorContagemRegressiva = tempoTotal / (tempoTotal / 100);
        let idInterval = setInterval(() => {
            this.valorContagemRegressiva--;
            if (this.valorContagemRegressiva <= 0) {
                acao();
                clearInterval(idInterval);
            }
        }, (tempoTotal / 100));

    }

}

import { Endereco } from './../../core/model/endereco';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from './../../core/model/cliente';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ClienteService } from './../../cliente/cliente.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-pedido-novo',
    templateUrl: './pedido-novo.component.html',
    styleUrls: ['./pedido-novo.component.scss']
})
export class PedidoNovoComponent implements OnInit {

    cliente: Cliente;
    endereco: Endereco;

    constructor(private clienteService: ClienteService,
        private errorHandlerService: ErrorHandlerService,
        private title: Title,
        private route: ActivatedRoute,) { }


    ngOnInit() {

        this.title.setTitle('Pedido');

        const idCliente = this.route.snapshot.params['idCliente'];

        this.clienteService
            .buscarPorCodigo(idCliente)
            .then((cliente) => {
                this.cliente = cliente;
                this.endereco = cliente.enderecos[0];
            })
            .catch(erro => this.errorHandlerService.handle(erro));

    }


}

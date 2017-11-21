import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Endereco } from '../../core/model/endereco';
import { Cliente } from '../../core/model/cliente';
import { ClienteService } from '../cliente.service';

@Component({
    selector: 'app-form-cliente',
    templateUrl: './form-cliente.component.html',
    styleUrls: ['./form-cliente.component.scss']
})
export class FormClienteComponent implements OnInit {

    @ViewChild('modalConfirmacao') public modal;

    clienteFormGroup: FormGroup;
    cliente: Cliente = new Cliente();
    salvando: Boolean = false;

    get editando() {
        return Boolean(this.cliente.id);
    }

    constructor(private formBuilder: FormBuilder,
        private clienteService: ClienteService,
        private errorHandlerService: ErrorHandlerService) { }

    ngOnInit() {

        this.clienteFormGroup = this.criarFormGroup();

        this.clienteFormGroup.valueChanges.subscribe((form) => {

            this.cliente.nome = form.nome;
            this.cliente.telefone = form.telefone;
            this.cliente.email = form.email;
            this.cliente.cpf = form.cpf;
            const endereco: Endereco = new Endereco();
            endereco.cep = form.enderecos.cep;
            endereco.bairro = form.enderecos.bairro;
            endereco.rua = form.enderecos.rua;
            endereco.numero = form.enderecos.numero;
            endereco.complemento = form.enderecos.complemento;
            endereco.cidade = form.enderecos.cidade;
            endereco.uf = form.enderecos.uf;
            this.cliente.enderecos = [endereco];

        });
    }

    criarFormGroup(): FormGroup {

        return this.formBuilder.group({
            //id: new FormControl(''),
            nome: ['', [Validators.required, Validators.minLength(2)]],
            telefone: ['', Validators.required],
            email: [''],
            cpf: [''],
            //endereco: this.formBuilder.group(new Endereco())
            enderecos: this.formBuilder.group({
                //id: new FormControl(''),
                cep: [''],
                rua: ['', Validators.required],
                numero: ['', Validators.required],
                complemento: [''],
                bairro: ['', Validators.required],
                //referencia: [''],
                cidade: ['', Validators.required],
                uf: ['', Validators.required],
            })
        });

    }


    onSubmit() {

        this.salvando = true;

        if (this.editando) {

            //this.atualizarCliente(this.cliente);

        } else {

            this.adicionarCliente(this.cliente);

        }

    }

    adicionarCliente(cliente) {

        this.clienteService
            .adicionar(cliente)
            .then((clienteSalvo) => {
                this.modal.show();
                this.salvando = false;
            })
            .catch(erro => {
                this.salvando = false;
                this.errorHandlerService.handle(erro);
            });
    }


    limparFormulario() {
        this.clienteFormGroup.reset();
        this.modal.hide();
        this.cliente = new Cliente();
    }

}

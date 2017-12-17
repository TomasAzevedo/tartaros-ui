import { AppUtil } from './../../shared/app-util';
import { Endereco } from './../../core/model/endereco';
import { ValidacaoHelperServiceService } from './../../shared/validacao-helper-service.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit, Output, EventEmitter, ViewChild, Renderer } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Cliente } from '../../core/model/cliente';
import { ClienteService } from '../cliente.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MDBPageScrollModule } from 'ng-mdb-pro/pro/smoothscroll/mdb-page-scroll.module';
import { window } from 'ng-mdb-pro/free/utils/facade/browser';
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
    textoModal: string;
    startDate = new Date(1990, 0, 1);
    dias = [];
    meses = [];
    anos = [];

    get editando() {
        return Boolean(this.cliente.id);
    }


    constructor(private formBuilder: FormBuilder,
        private clienteService: ClienteService,
        private errorHandlerService: ErrorHandlerService,
        private title: Title,
        private validacao: ValidacaoHelperServiceService,
        private route: ActivatedRoute,
        private renderer: Renderer) { }


    ngOnInit() {

        this.title.setTitle('Novo Cliente');

        const idCliente = this.route.snapshot.params['id'];

        if (idCliente) {
            this.clienteFormGroup = null;
            this.carregarCliente(idCliente);
        } else {
            this.criarFormGroup(this.cliente);
            this.manterThisClienteAtualizado();
        }

        this.iniciarCampoDataNascimento();

    }


    criarFormGroup(cliente: Cliente) {

        this.clienteFormGroup = this.formBuilder.group({
            id: [cliente.id],
            nome: [cliente.nome, Validators.required],
            telefone: [cliente.telefone, Validators.required],
            email: [cliente.email],
            cpf: [cliente.cpf],
            dataNascimento: [AppUtil.dateParaString(cliente.dataNascimento)],
            enderecosFormArray: this.formBuilder.array(this.criarFormArrayEnderecos(cliente))
        });

    }


    criarFormArrayEnderecos(cliente: Cliente) {

        let array = [];

        //Se não tiver endereço, cria pelo menos um para exibir o formulário.
        if (cliente.enderecos.length < 1) {
            cliente.enderecos.push(new Endereco());
        }

        cliente.enderecos.forEach(endereco => {
            array.push(this.criarFormGroupEndereco(endereco));
        });

        return array;
    }


    criarFormGroupEndereco(endereco: Endereco) {

        return this.formBuilder.group({
            id: [endereco.id],
            cep: [endereco.cep],
            rua: [endereco.rua, Validators.required],
            numero: [endereco.numero, Validators.required],
            complemento: [endereco.complemento],
            bairro: [endereco.bairro],
            //referencia: [''],
            cidade: [endereco.cidade],
            uf: [endereco.uf],
        });

    }


    manterThisClienteAtualizado() {

        this.clienteFormGroup.valueChanges.subscribe((form) => {

            this.cliente.nome = form.nome;
            this.cliente.telefone = form.telefone;
            this.cliente.email = form.email;
            this.cliente.cpf = form.cpf;
            this.cliente.dataNascimento = AppUtil.stringParaDate(form.dataNascimento);

            this.cliente.enderecos = new Array();

            for (let i = 0; i < form.enderecosFormArray.length; i++) {

                let enderecoFormGroup = form.enderecosFormArray[i];

                const endereco: Endereco = new Endereco();
                endereco.id = enderecoFormGroup.id;
                endereco.cep = enderecoFormGroup.cep;
                endereco.bairro = enderecoFormGroup.bairro;
                endereco.rua = enderecoFormGroup.rua;
                endereco.numero = enderecoFormGroup.numero;
                endereco.complemento = enderecoFormGroup.complemento;
                endereco.cidade = enderecoFormGroup.cidade;
                endereco.uf = enderecoFormGroup.uf;

                if (null != this.cliente.enderecos[i]) {
                    this.cliente.enderecos[i] = endereco;
                } else {
                    this.cliente.enderecos.push(endereco);
                }
            }

        });
    }


    criarFormNovoEndereco(index:  number) {
        let enderecosFormArray = this.clienteFormGroup.get('enderecosFormArray') as FormArray;
        enderecosFormArray.push(this.criarFormGroupEndereco(new Endereco()));
        setTimeout(() =>{
            document.getElementById('cardEndereco' + index).scrollIntoView({behavior: "smooth", block: "start"});
        }, 100);

    }


    excluirFormEndereco(index: number) {
        let enderecosFormArray = this.clienteFormGroup.get('enderecosFormArray') as FormArray;
        enderecosFormArray.removeAt(index);
        setTimeout(() =>{
            document.getElementById('cardEndereco' + (index-1)).scrollIntoView({behavior: "smooth", block: "start"});
        }, 100);
    }


    onSubmit() {

        this.salvando = true;

        if (this.editando) {

            this.atualizarCliente(this.cliente);

        } else {

            this.adicionarCliente(this.cliente);

        }

    }

    carregarCliente(id) {

        this.clienteService
            .buscarPorCodigo(id)
            .then((cliente) => {
                this.cliente = cliente;
                this.criarFormGroup(this.cliente);
                this.manterThisClienteAtualizado();
                this.title.setTitle('Editar Cliente');
            })
            .catch(erro => this.errorHandlerService.handle(erro));
    }


    adicionarCliente(cliente) {

        this.clienteService
            .adicionar(cliente)
            .then((clienteSalvo) => {
                this.atualizarTextoModal(this.cliente);
                this.modal.show();
                this.salvando = false;
            })
            .catch(erro => {
                this.salvando = false;
                this.errorHandlerService.handle(erro);
            });
    }


    atualizarCliente(cliente: Cliente) {

        this.clienteService
            .atualizar(cliente)
            .then(cliente => {

                this.cliente = cliente;
                this.modal.show();
                this.atualizarTextoModal(this.cliente);
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
        this.salvando = false;
    }


    atualizarTextoModal(cliente: Cliente) {

        if (this.editando) {
            this.textoModal = `O(a) cliente <strong>${cliente.nome}</strong> foi atualizado(a) com sucesso.`;
        } else {
            this.textoModal = `O(a) cliente <strong>${cliente.nome}</strong> foi salvo(a) com sucesso.`;
        }
    }


    iniciarCampoDataNascimento() {

        for(let i = 1; i <= 31; i++) {
            this.dias.push(i);
        }

        this.meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

        for( let i = 1920; i <= new Date().getFullYear(); i++) {
            this.anos.push(i);
        }
    }

}

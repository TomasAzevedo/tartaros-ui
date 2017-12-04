import { TipoComplementoService } from './../tipo-complemento.service';
import { ActivatedRoute } from '@angular/router';
import { ValidacaoHelperServiceService } from './../../shared/validacao-helper-service.service';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ComplementoService } from './../complemento.service';
import { Complemento } from './../../core/model/complemento';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, Renderer, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-complemento-form',
    templateUrl: './complemento-form.component.html',
    styleUrls: ['./complemento-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ComplementoFormComponent implements OnInit {

    @ViewChild('modalConfirmacao') public modal;

    complementoFormGroup: FormGroup;
    complemento: Complemento = new Complemento();
    salvando: Boolean = false;
    textoModal: string;
    tiposComplemento: Array<any> = new Array();

    get editando() {
        return Boolean(this.complemento.id);
    }


    constructor(private formBuilder: FormBuilder,
        private complementoService: ComplementoService,
        private errorHandlerService: ErrorHandlerService,
        private title: Title,
        private validacao: ValidacaoHelperServiceService,
        private route: ActivatedRoute,
        private renderer: Renderer,
        private tipoComplementoService: TipoComplementoService) { }


    ngOnInit() {

        this.title.setTitle('Novo Complemento');
        this.listarTiposComplementos();

        const idComplemento = this.route.snapshot.params['id'];

        if (idComplemento) {
            this.complementoFormGroup = null;
            this.carregarComplemento(idComplemento);
        } else {
            this.criarFormGroup(this.complemento);
            this.manterThisComplementoAtualizado();
        }

    }


    criarFormGroup(complemento: Complemento) {

        this.complementoFormGroup = this.formBuilder.group({
            id: [complemento.id],
            nome: [complemento.nome, Validators.required],
            descricao: [complemento.descricao],
            valor: [complemento.valor, Validators.required],
            tipoComplemento: [complemento.tipoComplemento.id, Validators.required]
        });

    }


    manterThisComplementoAtualizado() {

        this.complementoFormGroup.valueChanges.subscribe((form) => {
            this.complemento.id = form.id;
            this.complemento.nome = form.nome;
            this.complemento.descricao = form.descricao;
            this.complemento.valor = form.valor;
            this.complemento.tipoComplemento.id = form.tipoComplemento;
        });

    }


    listarTiposComplementos() {

        this.tipoComplementoService
            .listarTodos()
            .then((tipoComplementos) => {
                this.tiposComplemento = tipoComplementos;
            })
            .catch(error => this.errorHandlerService.handle(error));

    }


    onSubmit() {

        this.salvando = true;

        if (this.editando) {

            this.atualizarComplemento(this.complemento);

        } else {

            this.adicionarComplemento(this.complemento);

        }

    }

    carregarComplemento(id) {

        this.complementoService
            .buscarPorCodigo(id)
            .then((complemento) => {
                this.complemento = complemento;
                this.criarFormGroup(this.complemento);
                this.manterThisComplementoAtualizado();
                this.title.setTitle('Editar Complemento');
            })
            .catch(erro => this.errorHandlerService.handle(erro));
    }


    adicionarComplemento(complemento) {

        this.complementoService
            .adicionar(complemento)
            .then((complementoSalvo) => {
                this.atualizarTextoModal(this.complemento);
                this.modal.show();
                this.salvando = false;
            })
            .catch(erro => {
                this.salvando = false;
                this.errorHandlerService.handle(erro);
            });
    }


    atualizarComplemento(complemento: Complemento) {

        this.complementoService
            .atualizar(complemento)
            .then(complemento => {

                this.complemento = complemento;
                this.modal.show();
                this.atualizarTextoModal(this.complemento);
                this.salvando = false;

            })
            .catch(erro => {
                this.salvando = false;
                this.errorHandlerService.handle(erro);
            });
    }


    limparFormulario() {
        this.complementoFormGroup.reset();
        this.modal.hide();
        this.complemento = new Complemento();
        this.salvando = false;
    }


    atualizarTextoModal(complemento: Complemento) {

        if (this.editando) {
            this.textoModal = `O complemento <strong>${complemento.nome}</strong> foi atualizado com sucesso.`;
        } else {
            this.textoModal = `O complemento <strong>${complemento.nome}</strong> foi salvo com sucesso.`;
        }
    }

}

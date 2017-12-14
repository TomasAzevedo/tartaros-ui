import { AppUtil } from './../../shared/app-util';
import { Title } from '@angular/platform-browser';
import { Complemento } from './../../core/model/complemento';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ComplementoService } from '../complemento.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { ValidacaoHelperServiceService } from '../../shared/validacao-helper-service.service';

@Component({
    selector: 'app-complemento-pesquisa',
    templateUrl: './complemento-pesquisa.component.html',
    styleUrls: ['./complemento-pesquisa.component.scss']
})
export class ComplementoPesquisaComponent implements OnInit {

    @ViewChild('modalConfirmacaoExclusao') public modalConfirmacaoExclusao;
    complementos: Complemento[];
    complemento: Complemento = new Complemento();
    excluindo: Boolean = false;
    excluidoComSucesso: Boolean = false;
    complementoFormGroup: FormGroup;
    indexTipoComplementoSelecionada: number;
    valorContagemRegressiva: number = 100;

    constructor(private complementoService: ComplementoService,
        private errorHandlerService: ErrorHandlerService,
        private title: Title,
        private formBuilder: FormBuilder,
        private validacao: ValidacaoHelperServiceService) {

    }


    ngOnInit() {

        this.title.setTitle('Tipo de Complementos');
        this.listarTodos();
        this.criarFormTipoComplemento(this.complemento);
        this.complementoFormGroup = null;

    }


    criarFormTipoComplemento(complemento: Complemento) {

        this.complementoFormGroup = this.formBuilder.group({
            id: [complemento.id],
            nome: [complemento.nome, Validators.required],
            descricao: [complemento.descricao],
            valor: [complemento.valor, Validators.required],
            tipoComplemento: [complemento.tipoComplemento.id, Validators.required]
        });

        this.complementoFormGroup.valueChanges.subscribe((form) => {
            this.complemento.id = form.id;
            this.complemento.nome = form.nome;
            this.complemento.descricao = form.descricao;
            this.complemento.valor = form.valor;
            this.complemento.tipoComplemento.id = form.tipoComplemento;
        });

    }


    listarTodos() {

        this.complementoService
            .listarTodos()
            .then((complementos) => {
                this.complementos = complementos;
            })
            .catch(error => this.errorHandlerService.handle(error));

    }


    confimrarExclusao(complemento: Complemento) {
        this.complemento = complemento;
        this.modalConfirmacaoExclusao.show();
    }


    excluir() {

        this.excluindo = true;
        this.complementoService
            .excluir(this.complemento.id)
            .then(() => {


                this.excluidoComSucesso = true;
                this.excluindo = false;
                this.removerDaLista(this.complemento);
                this.complemento = new Complemento();

                this.executarContagemRegressiva(() => {
                    this.modalConfirmacaoExclusao.hide();
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


    removerDaLista(complemento: Complemento) {
        let index = this.complementos.indexOf(this.complemento);
        this.complementos = this.complementos.filter((val, i) => i != index);
    }


    getIndex(complemento: Complemento) {
        return this.complementos.indexOf(complemento);
    }


    executarContagemRegressiva(acao) {

        this.valorContagemRegressiva = AppUtil.TEMPO_CONTAGEM_REGRESSIVA / (AppUtil.TEMPO_CONTAGEM_REGRESSIVA / 100);
        let idInterval = setInterval(() => {
            this.valorContagemRegressiva--;
            if (this.valorContagemRegressiva <= 0) {
                acao();
                clearInterval(idInterval);
            }
        }, (AppUtil.TEMPO_CONTAGEM_REGRESSIVA / 100));

    }

}

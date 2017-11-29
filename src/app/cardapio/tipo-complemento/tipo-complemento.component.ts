import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoComplemento } from '../../core/model/tipo-complemento';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { ValidacaoHelperServiceService } from '../../shared/validacao-helper-service.service';
import { TipoComplementoService } from '../tipo-complemento.service';

@Component({
  selector: 'app-tipo-complemento',
  templateUrl: './tipo-complemento.component.html',
  styleUrls: ['./tipo-complemento.component.scss']
})
export class TipoComplementoComponent implements OnInit {

    @ViewChild('modalConfirmacaoExclusao') public modalConfirmacaoExclusao;
    @ViewChild('modalForm') public modalForm;
    tipoComplementos: TipoComplemento[];
    tipoComplemento: TipoComplemento = new TipoComplemento();
    excluindo: Boolean = false;
    excluidoComSucesso: Boolean = false;
    tipoComplementoFormGroup: FormGroup;
    ehEdicao: Boolean = false;
    salvoComSucesso: Boolean = false;
    salvando: Boolean = false;
    textoModalEdicaoInclusao: string = '';
    indexTipoComplementoSelecionada: number;
    valorContagemRegressiva: number = 100;

    constructor(private tipoComplementoService: TipoComplementoService,
        private errorHandlerService: ErrorHandlerService,
        private title: Title,
        private formBuilder: FormBuilder,
        private validacao: ValidacaoHelperServiceService, ) {

    }


    ngOnInit() {

        this.title.setTitle('Tipo de Complementos');

        this.listarTodas();

        this.criarFormTipoComplemento(this.tipoComplemento);
        this.tipoComplementoFormGroup = null;

    }


    criarFormTipoComplemento(tipoComplemento: TipoComplemento) {

        this.tipoComplementoFormGroup = this.formBuilder.group({
            id: [tipoComplemento.id],
            nome: [tipoComplemento.nome, Validators.required]
        });

        this.tipoComplementoFormGroup.valueChanges.subscribe((form) => {
            this.tipoComplemento.id = form.id;
            this.tipoComplemento.nome = form.nome;
        });

    }


    listarTodas() {

        this.tipoComplementoService
            .listarTodos()
            .then((tipoComplementos) => {
                this.tipoComplementos = tipoComplementos;
            })
            .catch(error => this.errorHandlerService.handle(error));

    }


    confimrarExclusao(tipoComplemento: TipoComplemento) {
        this.tipoComplemento = tipoComplemento;
        this.modalConfirmacaoExclusao.show();
    }


    excluir() {

        this.excluindo = true;
        this.tipoComplementoService
            .excluir(this.tipoComplemento.id)
            .then(() => {


                this.excluidoComSucesso = true;
                this.excluindo = false;
                this.removerDaLista(this.tipoComplemento);
                this.tipoComplemento = new TipoComplemento();

                this.executarContagemRegressiva(2500, () =>{
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


    removerDaLista(tipoComplemento: TipoComplemento) {
        let index = this.tipoComplementos.indexOf(this.tipoComplemento);
        this.tipoComplementos = this.tipoComplementos.filter((val,i) => i!=index);
    }


    salvar() {

        if (this.ehEdicao) {
            this.atualizarTipoComplemento(this.tipoComplemento);
        } else {
            this.adicionarTipoComplemento(this.tipoComplemento);
        }

    }


    adicionarTipoComplemento(tipoComplemento: TipoComplemento) {

        this.tipoComplementoService
            .adicionar(tipoComplemento)
            .then((tipoComplementoSalva) => {

                this.tipoComplemento = tipoComplementoSalva;

                this.salvoComSucesso = true;
                this.salvando = false;
                this.adicionarNaLista(this.tipoComplemento);

                this.executarContagemRegressiva(2500, () =>{
                    this.modalForm.hide();
                    setTimeout(() => {
                        this.salvoComSucesso = false;
                    }, 1000);
                });

            })
            .catch(erro => {
                this.salvando = false;
                this.errorHandlerService.handle(erro);
            });
    }


    adicionarNaLista(tipoComplemento: TipoComplemento) {
        let tipoComplementos = [...this.tipoComplementos];
        tipoComplementos.push(tipoComplemento);
        this.tipoComplementos = tipoComplementos;
    }


    atualizarTipoComplemento(tipoComplemento: TipoComplemento) {

        this.salvando = true;

        this.tipoComplementoService
            .atualizar(tipoComplemento)
            .then(tipoComplementoAtualizada => {

                this.tipoComplemento = tipoComplementoAtualizada;

                this.salvoComSucesso = true;
                this.atualizarNaLista(this.tipoComplemento, this.indexTipoComplementoSelecionada);
                this.salvando = false;

                this.executarContagemRegressiva(2500, () =>{
                    this.modalForm.hide();
                    setTimeout(() => {
                        this.salvoComSucesso = false;
                    }, 1000);
                });

            })
            .catch(erro => {
                this.salvando = false;
                this.errorHandlerService.handle(erro);
            });
    }


    atualizarNaLista(tipoComplementoSalva: TipoComplemento, index: number) {
        let tipoComplementos = [...this.tipoComplementos];
        let tipoComplemento = this.clonarTipoComplemento(tipoComplementoSalva);
        tipoComplementos[index] = tipoComplemento;
        this.tipoComplementos = tipoComplementos;
    }


    getIndex(tipoComplemento: TipoComplemento) {
        return this.tipoComplementos.indexOf(tipoComplemento);
    }


    abrirFormEdicao(tipoComplemento: TipoComplemento) {

        this.ehEdicao = true;
        this.indexTipoComplementoSelecionada = this.getIndex(tipoComplemento);
        this.atualizarTextoModal();
        this.criarFormTipoComplemento(tipoComplemento);
        this.modalForm.show();
    }


    abrirFormInclusao() {

        this.ehEdicao = false;
        this.atualizarTextoModal();
        this.criarFormTipoComplemento(new TipoComplemento());
        this.modalForm.show();
    }


    atualizarTextoModal() {
        if (this.ehEdicao) {
            this.textoModalEdicaoInclusao = 'Editar tipoComplemento';
        } else {
            this.textoModalEdicaoInclusao = 'Nova tipoComplemento';
        }
    }


    clonarTipoComplemento(c: TipoComplemento): TipoComplemento {
        let tipoComplemento = new TipoComplemento();
        for(let prop in c) {
            tipoComplemento[prop] = c[prop];
        }
        return tipoComplemento;
    }


    executarContagemRegressiva(tempoTotal: number, acao) {

        this.valorContagemRegressiva = tempoTotal / (tempoTotal / 100);
        let idInterval = setInterval( () => {
            this.valorContagemRegressiva--;
            if( this.valorContagemRegressiva <= 0 ) {
                acao();
                clearInterval(idInterval);
            }
        }, (tempoTotal / 100) );

    }

}

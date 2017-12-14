import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { FormaPagamentoService } from './../forma-pagamento.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormaPagamento } from './../../core/model/forma-pagamento';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppUtil } from '../../shared/app-util';

@Component({
    selector: 'app-forma-pagamento',
    templateUrl: './forma-pagamento.component.html',
    styleUrls: ['./forma-pagamento.component.scss']
})
export class FormaPagamentoComponent implements OnInit {

    @ViewChild('modalConfirmacaoExclusao') public modalConfirmacaoExclusao;
    @ViewChild('modalForm') public modalForm;
    formaPagamentos: FormaPagamento[];
    formaPagamento: FormaPagamento = new FormaPagamento();
    excluindo: Boolean = false;
    excluidoComSucesso: Boolean = false;
    formaPagamentoFormGroup: FormGroup;
    ehEdicao: Boolean = false;
    salvoComSucesso: Boolean = false;
    salvando: Boolean = false;
    textoModalEdicaoInclusao: string = '';
    indexFormaPagamentoSelecionada: number;
    valorContagemRegressiva: number = 100;

    constructor(private formaPagamentoService: FormaPagamentoService,
        private errorHandlerService: ErrorHandlerService,
        private title: Title,
        private formBuilder: FormBuilder) {

    }


    ngOnInit() {

        this.title.setTitle('Formas de Pagamentos');

        this.listarTodas();

        this.criarFormFormaPagamento(this.formaPagamento);
        this.formaPagamentoFormGroup = null;

    }


    criarFormFormaPagamento(formaPagamento: FormaPagamento) {

        this.formaPagamentoFormGroup = this.formBuilder.group({
            id: [formaPagamento.id],
            nome: [formaPagamento.nome, Validators.required]
        });

        this.formaPagamentoFormGroup.valueChanges.subscribe((form) => {
            this.formaPagamento.id = form.id;
            this.formaPagamento.nome = form.nome;
        });

    }


    listarTodas() {

        this.formaPagamentoService
            .listarTodos()
            .then((formaPagamentos) => {
                this.formaPagamentos = formaPagamentos;
            })
            .catch(error => this.errorHandlerService.handle(error));

    }


    confimrarExclusao(formaPagamento: FormaPagamento) {
        this.formaPagamento = formaPagamento;
        this.modalConfirmacaoExclusao.show();
    }


    excluir() {

        this.excluindo = true;
        this.formaPagamentoService
            .excluir(this.formaPagamento.id)
            .then(() => {


                this.excluidoComSucesso = true;
                this.excluindo = false;
                this.removerDaLista(this.formaPagamento);
                this.formaPagamento = new FormaPagamento();

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


    removerDaLista(formaPagamento: FormaPagamento) {
        let index = this.formaPagamentos.indexOf(this.formaPagamento);
        this.formaPagamentos = this.formaPagamentos.filter((val, i) => i != index);
    }


    salvar() {

        if (this.ehEdicao) {
            this.atualizarFormaPagamento(this.formaPagamento);
        } else {
            this.adicionarFormaPagamento(this.formaPagamento);
        }

    }


    adicionarFormaPagamento(formaPagamento: FormaPagamento) {

        this.formaPagamentoService
            .adicionar(formaPagamento)
            .then((formaPagamentoSalva) => {

                this.formaPagamento = formaPagamentoSalva;

                this.salvoComSucesso = true;
                this.salvando = false;
                this.adicionarNaLista(this.formaPagamento);

                this.executarContagemRegressiva(() => {
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


    adicionarNaLista(formaPagamento: FormaPagamento) {
        let formaPagamentos = [...this.formaPagamentos];
        formaPagamentos.push(this.clonarFormaPagamento(formaPagamento));
        this.formaPagamentos = formaPagamentos;
    }


    atualizarFormaPagamento(formaPagamento: FormaPagamento) {

        this.salvando = true;

        this.formaPagamentoService
            .atualizar(formaPagamento)
            .then(formaPagamentoAtualizada => {

                this.formaPagamento = formaPagamentoAtualizada;

                this.salvoComSucesso = true;
                this.atualizarNaLista(this.formaPagamento, this.indexFormaPagamentoSelecionada);
                this.salvando = false;

                this.executarContagemRegressiva(() => {
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


    atualizarNaLista(formaPagamentoSalva: FormaPagamento, index: number) {
        let formaPagamentos = [...this.formaPagamentos];
        let formaPagamento = this.clonarFormaPagamento(formaPagamentoSalva);
        formaPagamentos[index] = formaPagamento;
        this.formaPagamentos = formaPagamentos;
    }


    getIndex(formaPagamento: FormaPagamento) {
        return this.formaPagamentos.indexOf(formaPagamento);
    }


    abrirFormEdicao(formaPagamento: FormaPagamento) {

        this.ehEdicao = true;
        this.indexFormaPagamentoSelecionada = this.getIndex(formaPagamento);
        this.atualizarTextoModal();
        this.criarFormFormaPagamento(formaPagamento);
        this.modalForm.show();
    }


    abrirFormInclusao() {

        this.ehEdicao = false;
        this.atualizarTextoModal();
        this.criarFormFormaPagamento(new FormaPagamento());
        this.modalForm.show();
    }


    atualizarTextoModal() {
        if (this.ehEdicao) {
            this.textoModalEdicaoInclusao = 'Editar Forma de Pagamento';
        } else {
            this.textoModalEdicaoInclusao = 'Nova Forma de Pagamento';
        }
    }


    clonarFormaPagamento(c: FormaPagamento): FormaPagamento {
        let formaPagamento = new FormaPagamento();
        for (let prop in c) {
            formaPagamento[prop] = c[prop];
        }
        return formaPagamento;
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

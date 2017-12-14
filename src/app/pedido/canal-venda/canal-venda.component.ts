import { CanalVendaService } from './../canal-venda.service';
import { AppUtil } from './../../shared/app-util';
import { ValidacaoHelperServiceService } from './../../shared/validacao-helper-service.service';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CanalVenda } from './../../core/model/canal-venda';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-canal-venda',
    templateUrl: './canal-venda.component.html',
    styleUrls: ['./canal-venda.component.scss']
})
export class CanalVendaComponent implements OnInit {

    @ViewChild('modalConfirmacaoExclusao') public modalConfirmacaoExclusao;
    @ViewChild('modalForm') public modalForm;
    canalVendas: CanalVenda[];
    canalVenda: CanalVenda = new CanalVenda();
    excluindo: Boolean = false;
    excluidoComSucesso: Boolean = false;
    canalVendaFormGroup: FormGroup;
    ehEdicao: Boolean = false;
    salvoComSucesso: Boolean = false;
    salvando: Boolean = false;
    textoModalEdicaoInclusao: string = '';
    indexCanalVendaSelecionada: number;
    valorContagemRegressiva: number = 100;

    constructor(private canalVendaService: CanalVendaService,
        private errorHandlerService: ErrorHandlerService,
        private title: Title,
        private formBuilder: FormBuilder,
        private validacao: ValidacaoHelperServiceService, ) {

    }


    ngOnInit() {

        this.title.setTitle('Canal de Vendas');

        this.listarTodas();

        this.criarFormCanalVenda(this.canalVenda);
        this.canalVendaFormGroup = null;

    }


    criarFormCanalVenda(canalVenda: CanalVenda) {

        this.canalVendaFormGroup = this.formBuilder.group({
            id: [canalVenda.id],
            nome: [canalVenda.nome, Validators.required]
        });

        this.canalVendaFormGroup.valueChanges.subscribe((form) => {
            this.canalVenda.id = form.id;
            this.canalVenda.nome = form.nome;
        });

    }


    listarTodas() {

        this.canalVendaService
            .listarTodos()
            .then((canalVendas) => {
                this.canalVendas = canalVendas;
            })
            .catch(error => this.errorHandlerService.handle(error));

    }


    confimrarExclusao(canalVenda: CanalVenda) {
        this.canalVenda = canalVenda;
        this.modalConfirmacaoExclusao.show();
    }


    excluir() {

        this.excluindo = true;
        this.canalVendaService
            .excluir(this.canalVenda.id)
            .then(() => {


                this.excluidoComSucesso = true;
                this.excluindo = false;
                this.removerDaLista(this.canalVenda);
                this.canalVenda = new CanalVenda();

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


    removerDaLista(canalVenda: CanalVenda) {
        let index = this.canalVendas.indexOf(this.canalVenda);
        this.canalVendas = this.canalVendas.filter((val, i) => i != index);
    }


    salvar() {

        if (this.ehEdicao) {
            this.atualizarCanalVenda(this.canalVenda);
        } else {
            this.adicionarCanalVenda(this.canalVenda);
        }

    }


    adicionarCanalVenda(canalVenda: CanalVenda) {

        this.canalVendaService
            .adicionar(canalVenda)
            .then((canalVendaSalva) => {

                this.canalVenda = canalVendaSalva;

                this.salvoComSucesso = true;
                this.salvando = false;
                this.adicionarNaLista(this.canalVenda);

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


    adicionarNaLista(canalVenda: CanalVenda) {
        let canalVendas = [...this.canalVendas];
        canalVendas.push(this.clonarCanalVenda(canalVenda));
        this.canalVendas = canalVendas;
    }


    atualizarCanalVenda(canalVenda: CanalVenda) {

        this.salvando = true;

        this.canalVendaService
            .atualizar(canalVenda)
            .then(canalVendaAtualizada => {

                this.canalVenda = canalVendaAtualizada;

                this.salvoComSucesso = true;
                this.atualizarNaLista(this.canalVenda, this.indexCanalVendaSelecionada);
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


    atualizarNaLista(canalVendaSalva: CanalVenda, index: number) {
        let canalVendas = [...this.canalVendas];
        let canalVenda = this.clonarCanalVenda(canalVendaSalva);
        canalVendas[index] = canalVenda;
        this.canalVendas = canalVendas;
    }


    getIndex(canalVenda: CanalVenda) {
        return this.canalVendas.indexOf(canalVenda);
    }


    abrirFormEdicao(canalVenda: CanalVenda) {

        this.ehEdicao = true;
        this.indexCanalVendaSelecionada = this.getIndex(canalVenda);
        this.atualizarTextoModal();
        this.criarFormCanalVenda(canalVenda);
        this.modalForm.show();
    }


    abrirFormInclusao() {

        this.ehEdicao = false;
        this.atualizarTextoModal();
        this.criarFormCanalVenda(new CanalVenda());
        this.modalForm.show();
    }


    atualizarTextoModal() {
        if (this.ehEdicao) {
            this.textoModalEdicaoInclusao = 'Editar canalVenda';
        } else {
            this.textoModalEdicaoInclusao = 'Nova canalVenda';
        }
    }


    clonarCanalVenda(c: CanalVenda): CanalVenda {
        let canalVenda = new CanalVenda();
        for (let prop in c) {
            canalVenda[prop] = c[prop];
        }
        return canalVenda;
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

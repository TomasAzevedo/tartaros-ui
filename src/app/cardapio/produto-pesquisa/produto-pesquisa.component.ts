import { AppUtil } from './../../shared/app-util';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ProdutoService } from './../produto.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Produto } from './../../core/model/produto';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-produto-pesquisa',
    templateUrl: './produto-pesquisa.component.html',
    styleUrls: ['./produto-pesquisa.component.scss']
})
export class ProdutoPesquisaComponent implements OnInit {

    @ViewChild('modalConfirmacao') public modal;

    produtos: Produto[];
    produto: Produto = new Produto();
    excluindo: Boolean = false;
    excluidoComSucesso: Boolean = false;
    valorContagemRegressiva: number;

    constructor(private produtoService: ProdutoService,
        private errorHandlerService: ErrorHandlerService,
        private title: Title) {

    }


    ngOnInit() {

        this.title.setTitle('Produtos');

        this.listarTodos();

    }


    listarTodos() {

        this.produtoService
            .listarTodos()
            .then((produtos) => {
                this.produtos = produtos;
            })
            .catch(error => this.errorHandlerService.handle(error));

    }


    confimrarExclusao(produto: Produto) {
        this.produto = produto;
        this.modal.show();
    }


    excluir() {

        this.excluindo = true;
        this.produtoService
            .excluir(this.produto.id)
            .then(() => {

                this.excluidoComSucesso = true;
                this.excluindo = false;
                //this.listarTodos();
                this.removerDaLista(this.produto);
                this.produto = new Produto();
                this.executarContagemRegressiva(() => {
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

    removerDaLista(produto: Produto) {
        let index = this.produtos.indexOf(this.produto);
        this.produtos = this.produtos.filter((val, i) => i != index);
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

import { ValidacaoHelperServiceService } from './../../shared/validacao-helper-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Categoria } from '../../core/model/categoria';
import { CategoriaService } from '../categoria.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { AppUtil } from '../../shared/app-util';

@Component({
    selector: 'app-categorias',
    templateUrl: './categorias.component.html',
    styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

    @ViewChild('modalConfirmacaoExclusao') public modalConfirmacaoExclusao;
    @ViewChild('modalForm') public modalForm;
    categorias: Categoria[];
    categoria: Categoria = new Categoria();
    excluindo: Boolean = false;
    excluidoComSucesso: Boolean = false;
    categoriaFormGroup: FormGroup;
    ehEdicao: Boolean = false;
    salvoComSucesso: Boolean = false;
    salvando: Boolean = false;
    textoModalEdicaoInclusao: string = '';
    indexCategoriaSelecionada: number;
    valorContagemRegressiva: number = 100;

    constructor(private categoriaService: CategoriaService,
        private errorHandlerService: ErrorHandlerService,
        private title: Title,
        private formBuilder: FormBuilder,
        private validacao: ValidacaoHelperServiceService, ) {

    }


    ngOnInit() {

        this.title.setTitle('Categorias');

        this.listarTodas();

        this.criarFormCategoria(this.categoria);
        this.categoriaFormGroup = null;

    }


    criarFormCategoria(categoria: Categoria) {

        this.categoriaFormGroup = this.formBuilder.group({
            id: [categoria.id],
            nome: [categoria.nome, Validators.required]
        });

        this.categoriaFormGroup.valueChanges.subscribe((form) => {
            this.categoria.id = form.id;
            this.categoria.nome = form.nome;
        });

    }


    listarTodas() {

        this.categoriaService
            .listarTodos()
            .then((categorias) => {
                this.categorias = categorias;
            })
            .catch(error => this.errorHandlerService.handle(error));

    }


    confimrarExclusao(categoria: Categoria) {
        this.categoria = categoria;
        this.modalConfirmacaoExclusao.show();
    }


    excluir() {

        this.excluindo = true;
        this.categoriaService
            .excluir(this.categoria.id)
            .then(() => {


                this.excluidoComSucesso = true;
                this.excluindo = false;
                this.removerDaLista(this.categoria);
                this.categoria = new Categoria();

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


    removerDaLista(categoria: Categoria) {
        let index = this.categorias.indexOf(this.categoria);
        this.categorias = this.categorias.filter((val, i) => i != index);
    }


    salvar() {

        if (this.ehEdicao) {
            this.atualizarCategoria(this.categoria);
        } else {
            this.adicionarCategoria(this.categoria);
        }

    }


    adicionarCategoria(categoria: Categoria) {

        this.categoriaService
            .adicionar(categoria)
            .then((categoriaSalva) => {

                this.categoria = categoriaSalva;

                this.salvoComSucesso = true;
                this.salvando = false;
                this.adicionarNaLista(this.categoria);

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


    adicionarNaLista(categoria: Categoria) {
        let categorias = [...this.categorias];
        categorias.push(this.clonarCategoria(categoria));
        this.categorias = categorias;
    }


    atualizarCategoria(categoria: Categoria) {

        this.salvando = true;

        this.categoriaService
            .atualizar(categoria)
            .then(categoriaAtualizada => {

                this.categoria = categoriaAtualizada;

                this.salvoComSucesso = true;
                this.atualizarNaLista(this.categoria, this.indexCategoriaSelecionada);
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


    atualizarNaLista(categoriaSalva: Categoria, index: number) {
        let categorias = [...this.categorias];
        let categoria = this.clonarCategoria(categoriaSalva);
        categorias[index] = categoria;
        this.categorias = categorias;
    }


    getIndex(categoria: Categoria) {
        return this.categorias.indexOf(categoria);
    }


    abrirFormEdicao(categoria: Categoria) {

        this.ehEdicao = true;
        this.indexCategoriaSelecionada = this.getIndex(categoria);
        this.atualizarTextoModal();
        this.criarFormCategoria(categoria);
        this.modalForm.show();
    }


    abrirFormInclusao() {

        this.ehEdicao = false;
        this.atualizarTextoModal();
        this.criarFormCategoria(new Categoria());
        this.modalForm.show();
    }


    atualizarTextoModal() {
        if (this.ehEdicao) {
            this.textoModalEdicaoInclusao = 'Editar categoria';
        } else {
            this.textoModalEdicaoInclusao = 'Nova categoria';
        }
    }


    clonarCategoria(c: Categoria): Categoria {
        let categoria = new Categoria();
        for (let prop in c) {
            categoria[prop] = c[prop];
        }
        return categoria;
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

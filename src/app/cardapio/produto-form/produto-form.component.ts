import { Categoria } from './../../core/model/categoria';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ProdutoService } from './../produto.service';
import { Produto } from './../../core/model/produto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { Complemento } from '../../core/model/complemento';
import { CategoriaService } from '../categoria.service';
import { ComplementoService } from '../complemento.service';

@Component({
    selector: 'app-produto-form',
    templateUrl: './produto-form.component.html',
    styleUrls: ['./produto-form.component.scss']
})
export class ProdutoFormComponent implements OnInit {

    @ViewChild('modalConfirmacao') public modal;

    produtoFormGroup: FormGroup;
    produto: Produto = new Produto();
    salvando: Boolean = false;
    textoModal: string;
    categorias: Array<any> = new Array();
    complementos: Array<any> = new Array();

    get editando() {
        return Boolean(this.produto.id);
    }


    constructor(private formBuilder: FormBuilder,
        private produtoService: ProdutoService,
        private errorHandlerService: ErrorHandlerService,
        private title: Title,
        private route: ActivatedRoute,
        private renderer: Renderer,
        private categoriaService: CategoriaService,
        private complementoService: ComplementoService) { }


    ngOnInit() {

        this.title.setTitle('Novo Produto');

        this.listarCategorias();
        this.listarComplementos();

        const idProduto = this.route.snapshot.params['id'];
        if (idProduto) {
            this.produtoFormGroup = null;
            this.carregarProduto(idProduto);
        } else {
            this.criarFormGroup(this.produto);
            this.manterThisProdutoAtualizado();
        }

    }


    criarFormGroup(produto: Produto) {

        this.produtoFormGroup = this.formBuilder.group({
            id: [produto.id],
            nome: [produto.nome, Validators.required],
            descricao: [produto.descricao],
            valor: [produto.valor, Validators.required],
            emFalta: [produto.emFalta],
            categoriaId: [produto.categoria.id, Validators.required],
            complementos: [produto.listaComplementos.map(complemento => complemento.id)]
        });

    }


    manterThisProdutoAtualizado() {

        this.produtoFormGroup.valueChanges.subscribe((form) => {

            this.produto.nome = form.nome;
            this.produto.descricao = form.descricao;
            this.produto.valor = form.valor;
            this.produto.emFalta = form.emFalta;
            this.produto.categoria.id = form.categoriaId;
            this.produto.listaComplementos = new Array();
            this.produto.listaComplementos = this.obterListaComplementos(form.complementos);

        });

    }


    obterListaComplementos(array: Array<number>) {

        let listaComplementos: Complemento[] = new Array();

        if(null != array) {

            array.forEach(id => {
                let complemento: Complemento = new Complemento();
                complemento.id = id;
                listaComplementos.push(complemento);
            });

        }

        return listaComplementos;
    }


    listarCategorias() {

        this.categoriaService
            .listarTodos()
            .then((categorias) => {
                this.categorias = categorias;
            })
            .catch(error => this.errorHandlerService.handle(error));

    }

    listarComplementos() {

        this.complementoService
            .listarTodos()
            .then((complementos) => {
                this.complementos = complementos;
            })
            .catch(error => this.errorHandlerService.handle(error));

    }


    onSubmit() {

        this.salvando = true;

        if (this.editando) {

            this.atualizarProduto(this.produto);

        } else {

            this.adicionarProduto(this.produto);

        }

    }

    carregarProduto(id) {

        this.produtoService
            .buscarPorCodigo(id)
            .then((produto) => {
                this.produto = produto;
                this.criarFormGroup(this.produto);
                this.manterThisProdutoAtualizado();
                this.title.setTitle('Editar Produto');
            })
            .catch(erro => this.errorHandlerService.handle(erro));
    }


    adicionarProduto(produto) {

        this.produtoService
            .adicionar(produto)
            .then((produtoSalvo) => {
                this.atualizarTextoModal(this.produto);
                this.modal.show();
                this.salvando = false;
            })
            .catch(erro => {
                this.salvando = false;
                this.errorHandlerService.handle(erro);
            });
    }


    atualizarProduto(produto: Produto) {

        this.produtoService
            .atualizar(produto)
            .then(produto => {

                this.produto = produto;
                this.modal.show();
                this.atualizarTextoModal(this.produto);
                this.salvando = false;

            })
            .catch(erro => {
                this.salvando = false;
                this.errorHandlerService.handle(erro);
            });
    }


    limparFormulario() {
        this.produtoFormGroup.reset();
        this.modal.hide();
        this.produto = new Produto();
        this.salvando = false;
    }


    atualizarTextoModal(produto: Produto) {

        if (this.editando) {
            this.textoModal = `O produto <strong>${produto.nome}</strong> foi atualizado com sucesso.`;
        } else {
            this.textoModal = `O produto <strong>${produto.nome}</strong> foi salvo com sucesso.`;
        }
    }


}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Categoria } from '../../core/model/categoria';
import { CategoriaService } from '../categoria.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-categorias',
    templateUrl: './categorias.component.html',
    styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

    @ViewChild('modalConfirmacaoExclusao') public modalConfirmacaoExclusao;

    categorias: Categoria[];
    categoria: Categoria = new Categoria();
    excluindo: Boolean = false;
    excluidoComSucesso: Boolean = false;

    constructor(private categoriaService: CategoriaService,
        private errorHandlerService: ErrorHandlerService,
        private title: Title) {

    }


    ngOnInit() {

        this.title.setTitle('Categorias');

        this.listarTodas();

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

                this.categoria = new Categoria();
                this.excluidoComSucesso = true;
                this.excluindo = false;
                this.listarTodas();
                setTimeout(() => {
                    this.modalConfirmacaoExclusao.hide();
                    setTimeout(() => {
                        this.excluidoComSucesso = false;
                    }, 1000);
                }, 2500);
            })
            .catch(error => {
                this.excluindo = false;
                this.errorHandlerService.handle(error)
            });
    }

}

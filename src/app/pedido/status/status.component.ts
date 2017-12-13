import { StatusService } from './../status.service';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Status } from './../../core/model/status';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-status',
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

    @ViewChild('modalConfirmacaoExclusao') public modalConfirmacaoExclusao;
    @ViewChild('modalForm') public modalForm;
    listaStatus: Status[];
    status: Status = new Status();
    excluindo: Boolean = false;
    excluidoComSucesso: Boolean = false;
    statusFormGroup: FormGroup;
    ehEdicao: Boolean = false;
    salvoComSucesso: Boolean = false;
    salvando: Boolean = false;
    textoModalEdicaoInclusao: string = '';
    indexStatusSelecionada: number;
    valorContagemRegressiva: number = 100;

    constructor(private statusService: StatusService,
        private errorHandlerService: ErrorHandlerService,
        private title: Title,
        private formBuilder: FormBuilder) {

    }


    ngOnInit() {

        this.title.setTitle('Statuss');

        this.listarTodas();

        this.criarFormStatus(this.status);
        this.statusFormGroup = null;

    }


    criarFormStatus(status: Status) {

        this.statusFormGroup = this.formBuilder.group({
            id: [status.id],
            nome: [status.nome, Validators.required]
        });

        this.statusFormGroup.valueChanges.subscribe((form) => {
            this.status.id = form.id;
            this.status.nome = form.nome;
        });

    }


    listarTodas() {

        this.statusService
            .listarTodos()
            .then((listaStatus) => {
                this.listaStatus = listaStatus;
            })
            .catch(error => this.errorHandlerService.handle(error));

    }


    confimrarExclusao(status: Status) {
        this.status = status;
        this.modalConfirmacaoExclusao.show();
    }


    excluir() {

        this.excluindo = true;
        this.statusService
            .excluir(this.status.id)
            .then(() => {


                this.excluidoComSucesso = true;
                this.excluindo = false;
                this.removerDaLista(this.status);
                this.status = new Status();

                this.executarContagemRegressiva(2500, () => {
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


    removerDaLista(status: Status) {
        let index = this.listaStatus.indexOf(this.status);
        this.listaStatus = this.listaStatus.filter((val, i) => i != index);
    }


    salvar() {

        if (this.ehEdicao) {
            this.atualizarStatus(this.status);
        } else {
            this.adicionarStatus(this.status);
        }

    }


    adicionarStatus(status: Status) {

        this.statusService
            .adicionar(status)
            .then((statusSalva) => {

                this.status = statusSalva;

                this.salvoComSucesso = true;
                this.salvando = false;
                this.adicionarNaLista(this.status);

                this.executarContagemRegressiva(2500, () => {
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


    adicionarNaLista(status: Status) {
        let listaStatus = [...this.listaStatus];
        listaStatus.push(status);
        this.listaStatus = listaStatus;
    }


    atualizarStatus(status: Status) {

        this.salvando = true;

        this.statusService
            .atualizar(status)
            .then(statusAtualizada => {

                this.status = statusAtualizada;

                this.salvoComSucesso = true;
                this.atualizarNaLista(this.status, this.indexStatusSelecionada);
                this.salvando = false;

                this.executarContagemRegressiva(2500, () => {
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


    atualizarNaLista(statusSalva: Status, index: number) {
        let listaStatus = [...this.listaStatus];
        let status = this.clonarStatus(statusSalva);
        listaStatus[index] = status;
        this.listaStatus = listaStatus;
    }


    getIndex(status: Status) {
        return this.listaStatus.indexOf(status);
    }


    abrirFormEdicao(status: Status) {

        this.ehEdicao = true;
        this.indexStatusSelecionada = this.getIndex(status);
        this.atualizarTextoModal();
        this.criarFormStatus(status);
        this.modalForm.show();
    }


    abrirFormInclusao() {

        this.ehEdicao = false;
        this.atualizarTextoModal();
        this.criarFormStatus(new Status());
        this.modalForm.show();
    }


    atualizarTextoModal() {
        if (this.ehEdicao) {
            this.textoModalEdicaoInclusao = 'Editar status';
        } else {
            this.textoModalEdicaoInclusao = 'Novo status';
        }
    }


    clonarStatus(c: Status): Status {
        let status = new Status();
        for (let prop in c) {
            status[prop] = c[prop];
        }
        return status;
    }


    executarContagemRegressiva(tempoTotal: number, acao) {

        this.valorContagemRegressiva = tempoTotal / (tempoTotal / 100);
        let idInterval = setInterval(() => {
            this.valorContagemRegressiva--;
            if (this.valorContagemRegressiva <= 0) {
                acao();
                clearInterval(idInterval);
            }
        }, (tempoTotal / 100));

    }
}

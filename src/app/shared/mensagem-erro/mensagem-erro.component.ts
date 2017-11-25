import { FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-mensagem-erro',
    templateUrl: './mensagem-erro.component.html',
    styleUrls: ['./mensagem-erro.component.scss']
})
export class MensagemErroComponent {

    @Input() msgErro: string;
    @Input() exibirErro: boolean;
    @Input() temIcone: boolean;

}

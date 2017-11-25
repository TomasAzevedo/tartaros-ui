import { FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class ValidacaoHelperServiceService {

    constructor() { }

    isCampoValido(formControl: FormControl) {
        return !formControl.valid && formControl.touched;
    }

    adicionaCssErro(formControl: FormControl) {
        return {
            'validate': this.isCampoValido(formControl),
            'invalid': this.isCampoValido(formControl)
        };
    }

    adicionaCssErroIcone(formControl: FormControl) {
        return {
            'iconeVermelho': this.isCampoValido(formControl)
        };
    }

}

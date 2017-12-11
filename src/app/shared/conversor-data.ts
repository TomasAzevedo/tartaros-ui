import { Component, OnInit } from '@angular/core';
import { NativeDateAdapter } from '@angular/material';
import * as _moment from 'moment';

export class ConversorData extends NativeDateAdapter {

    format(date: Date, displayFormat: Object): string {

        console.log(date);

        let data = _moment(date);
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();

        if (displayFormat == "input") {
            return this._to2digit(data.date()) + '/'+this._to2digit(data.month()+1) + '/' + data.year();
        } else {
            return this._toString(month) + ' ' + year;
        }
    }

    private _to2digit(n: number) {
        return ('00' + n).slice(-2);
    }

    private _toString(n: number) {
        let month = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        return month[n];
    }
}

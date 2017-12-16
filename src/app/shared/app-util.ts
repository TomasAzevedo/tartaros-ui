import { Injectable } from '@angular/core';
import { DatePipe } from "@angular/common";

@Injectable()
export class AppUtil {

    public static TEMPO_CONTAGEM_REGRESSIVA: number = 2000;

    constructor(private datePipe: DatePipe) {

    }

    stringParaDate(dataString: string): Date {
        let data = dataString.split("/");
        return new Date(data[1]+"/" +data[0]+"/"+data[2]);
    }

    dateParaString(date: Date) : string {
        return this.datePipe.transform(date, 'dd/MM/yyyy');
    }
}

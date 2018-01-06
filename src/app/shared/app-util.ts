export class AppUtil {

    public static TEMPO_CONTAGEM_REGRESSIVA: number = 2000;

    static stringParaDate(dataString: string): Date {
        if (dataString) {
            let data = dataString.split("/");
            return new Date(data[1] + "/" + data[0] + "/" + data[2]);
        }
    }

    static dateParaString(date): string {
        if (date) {
            let data = new Date(date);
            return this._to2digit(data.getUTCDate()) + "/" + this._to2digit(data.getUTCMonth() + 1) + "/" + data.getUTCFullYear();
        } else {
            return "";
        }
    }

    private static _to2digit(n: number) {
        return ('00' + n).slice(-2);
    }
}

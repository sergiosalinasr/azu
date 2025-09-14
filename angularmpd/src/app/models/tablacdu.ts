export class Tablacdu {
    id: number = 0;
    id_tdu: number;
    nombreCorto: string;
    descripcionLarga: string;

    constructor(id: number, id_tdu: number, nombreCorto: string, descripcionLarga: string) {
        this.id = id;
        this.id_tdu = id_tdu;
        this.nombreCorto = nombreCorto;
        this.descripcionLarga = descripcionLarga;
      }
}

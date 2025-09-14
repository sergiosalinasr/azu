import { Timestamp } from "rxjs";

export class Cdu {
  id: number;
  id_tdu: number;
  nombreCorto: string;
  descripcionLarga: string;

  constructor(id: number, nombreCorto: string, descripcionLarga: string, id_tdu: number) {
    this.id = id;
    this.id_tdu = id_tdu;
    this.nombreCorto = nombreCorto;
    this.descripcionLarga = descripcionLarga;
  }
}

export class CduCampos extends Cdu {
  desctdu: string;

  constructor(
    id: number,
    nombreCorto: string,
    descripcionLarga: string,
    id_tdu: number,
    desctdu: string
  ) {
    super(id, nombreCorto, descripcionLarga, id_tdu);
    this.desctdu = desctdu;
  }
}


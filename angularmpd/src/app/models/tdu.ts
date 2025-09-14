import { Timestamp } from "rxjs";

export class Tdu {
  id: number;
  nombreCorto: string;
  descripcionLarga: string;

  constructor(id: number, nombreCorto: string, descripcionLarga: string) {
    this.id = id;
    this.nombreCorto = nombreCorto;
    this.descripcionLarga = descripcionLarga;
  }
}

export class TduCampos extends Tdu {
  campoAdicional: string;

  constructor(
    id: number,
    nombreCorto: string,
    descripcionLarga: string,
    campoAdicional: string
  ) {
    super(id, nombreCorto, descripcionLarga);
    this.campoAdicional = campoAdicional;
  }
}


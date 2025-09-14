import { Timestamp } from "rxjs";

export class Ley {
  id: number;
  nombre: string;
  descripcion: string;
  fechapublicacion: string;
  pais: number;

  constructor(id: number, nombre: string, descripcion: string, fechapublicacion: string, pais: number) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.fechapublicacion = fechapublicacion;
    this.pais = pais;
  }
}

export class LeyCampos extends Ley {
  descripcionpais: string;

  constructor(
    id: number,
    nombre: string,
    descripcion: string,
    fechapublicacion: string,
    pais: number,
    descripcionpais: string
  ) {
    super(id, nombre, descripcion, fechapublicacion, pais);
    this.descripcionpais = descripcionpais;
  }
}


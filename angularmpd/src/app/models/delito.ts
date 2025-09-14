import { Timestamp } from "rxjs";

export class Delito {
  id: number;
  idley: number;
  nombre: string;
  descripcion: string;
  sancion: number;
  nivelgravedad: number;

  constructor(id: number, idley: number, nombre: string, descripcion: string, sancion: number, nivelgravedad: number) {
    this.id = id;
    this.idley = idley;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.sancion = sancion;
    this.nivelgravedad = nivelgravedad;
  }
}

export class DelitoCampos extends Delito {
  descley: string;
  descsancion: string;
  descnivelgravedad: string;

  constructor(
    id: number,
    idley: number,
    descley: string,
    nombre: string,
    descripcion: string,
    sancion: number,
    descsancion: string,
    nivelgravedad: number,
    descnivelgravedad: string,
  ) {
    super(id, idley, nombre, descripcion, sancion, nivelgravedad);
    this.descley = descley;
    this.descsancion = descsancion;
    this.descnivelgravedad = descnivelgravedad;
  }
}


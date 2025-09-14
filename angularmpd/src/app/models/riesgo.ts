import { Timestamp } from "rxjs";

export class Riesgo {
  id: number;
  iddelito: number;
  nombre: string;
  descripcion: string;
  probabilidad: number;
  impacto: number;
  mitigacion: number;

  constructor(id: number, iddelito: number, nombre: string, descripcion: string, probabilidad: number, impacto: number, mitigacion: number) {
    this.id = id;
    this.iddelito = iddelito;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.probabilidad = probabilidad;
    this.impacto = impacto;
    this.mitigacion = mitigacion;
  }
}

export class RiesgoCampos extends Riesgo {
  descdelito: string;
  descprobabilidad: string;
  descimpacto: string;
  descmitigacion: string;

  constructor(
    id: number,
    iddelito: number,
    descdelito: string,
    nombre: string,
    descripcion: string,
    probabilidad: number,
    descprobabilidad: string,
    impacto: number,
    descimpacto: string,
    mitigacion: number,
    descmitigacion: string,
  ) {
    super(id, iddelito, nombre, descripcion, probabilidad, impacto, mitigacion);
    this.descdelito = descdelito;
    this.descprobabilidad = descprobabilidad;
    this.descimpacto = descimpacto;
    this.descmitigacion = descmitigacion;
  }
}


import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  formatISODateToDDMMYYYY(isoDate: string): string {
    if (!isoDate) return '';
    const [datePart] = isoDate.split('T');
    const [year, month, day] = datePart.split('-');
    return `${day}-${month}-${year}`;
  }

  formatDateToYYYYMMDD(fecha: string): string {
    // Divide la fecha en día, mes y año usando el separador '-'
    const [dia, mes, anio] = fecha.split('-');
  
    // Devuelve la fecha en formato "aaaa-mm-dd"
    return `${anio}-${mes}-${dia}`;
  }

}

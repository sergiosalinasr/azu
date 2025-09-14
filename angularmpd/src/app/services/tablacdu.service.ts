import { Injectable } from '@angular/core';
import { Tablacdu } from '../models/tablacdu'
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError, firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TablacduService {

  url_mpd: string = environment.env_url_backend;

  constructor(private http:HttpClient) { }

  tablaCduLista():Observable<Tablacdu[]>{

    let direccion = this.url_mpd + "/cdu";
    return this.http.get<Tablacdu[]>(direccion);

  }

  tablaCduByIdTdu(id_cdu: number, id_tdu: number):Observable<Tablacdu[]>{
  
      let direccion = this.url_mpd + "/cdu/" + id_cdu + "/tdu/" + id_tdu;
      console.log("GET direccion: " + direccion);
      return this.http.get<Tablacdu[]>(direccion);
  
    }

    // Controlador para obtener lista de registros de CDU según un id_tdu (Por ejemplo 4 tabla de paises)
    getCDUsByTDU( id_tdu: number):Observable<Tablacdu[]>{
  
      let direccion = this.url_mpd + "/cdu/tdu/" + id_tdu;
      return this.http.get<Tablacdu[]>(direccion);
  
    }

  async getCDUsByTDUAsync(id_tdu: number): Promise<Tablacdu[]> {
    const direccion = `${this.url_mpd}/cdu/tdu/${id_tdu}`;
    try {
      return await firstValueFrom(this.http.get<Tablacdu[]>(direccion));
    } catch (error) {
      console.error('Error al obtener los CDUs:', error);
      throw error;
    }
  }

  putTablacdu(form:Tablacdu):Observable<any>{
    
    const url = this.url_mpd + "/cdu/" + form.id; // URL completa con el ID
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { id_tdu: form.id_tdu, nombreCorto: form.nombreCorto, descripcionLarga: form.descripcionLarga };
    console.log("putTablacdu url: " + url)
    return this.http.put(url, body, { headers });
    
  }

  postTablacdu(form:Tablacdu):Observable<any>{

    const url = this.url_mpd + "/cdu/";
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { id_tdu: form.id_tdu, nombreCorto: form.nombreCorto, descripcionLarga: form.descripcionLarga };
    return this.http.post(url, body, { headers });

  }

  deleteTablacdu(form:Tablacdu):Observable<any>{
    
    const url = this.url_mpd + "/cdu/" + form.id; // URL completa con el ID
    return this.http.delete(url);

  }

}

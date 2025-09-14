import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Cdu, CduCampos } from '../models/cdu'

@Injectable({
  providedIn: 'root'
})
export class CduService {
url_mpd: string = environment.env_url_backend;

  constructor(private http:HttpClient) { }

  cduLista():Observable<Cdu[]>{

    let direccion = this.url_mpd + "/cdu";
    return this.http.get<Cdu[]>(direccion);

  }

  getcducampos():Observable<CduCampos[]>{

    let direccion = this.url_mpd + "/cdu/getcducampos";
    return this.http.get<CduCampos[]>(direccion);

  }

  getcducamposid_tdu(id_tdu: number):Observable<CduCampos[]>{

    console.log("En getcducamposid_tdu id_tdu=" + id_tdu)
    let direccion = this.url_mpd + "/cdu/getcducampos/" + id_tdu;
    console.log("GET direccion: " + direccion);
    return this.http.get<CduCampos[]>(direccion);

  }

  cduById(id: number):Observable<Cdu[]>{

    let direccion = this.url_mpd + "/cdu/" + id;
    console.log("GET direccion: " + direccion);
    return this.http.get<Cdu[]>(direccion);

  }

  getcdubynombre(nombreCorto: string):Observable<Cdu[]>{

    let direccion = this.url_mpd + "/cdu/getcdubynombre/" + nombreCorto;
    console.log("GET direccion: " + direccion);
    return this.http.get<Cdu[]>(direccion);

  }

  putCdu(form:Cdu):Observable<any>{
    
    const url = this.url_mpd + "/cdu/" + form.id; // URL completa con el ID
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { nombreCorto: form.nombreCorto, descripcionLarga: form.descripcionLarga, id_tdu: form.id_tdu };
    console.log("putCdu url: " + url)
    return this.http.put(url, body, { headers });
    
  }

  postCdu(form:Cdu):Observable<any>{
    console.log("En postCdu - this.selectedCdu.nombreCorto: " + form.id + form.nombreCorto + 
      " descripcionLarga" + form.descripcionLarga +
      " id_tdu" + form.id_tdu);
    const url = this.url_mpd + "/cdu/";
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { nombreCorto: form.nombreCorto, descripcionLarga: form.descripcionLarga, id_tdu: form.id_tdu };

    return this.http.post(url, body, { headers });

  }

  deleteCdu(form:Cdu):Observable<any>{
    
    const url = this.url_mpd + "/cdu/" + form.id; // URL completa con el ID
    return this.http.delete(url);

  }

  deleteCduId(idCdu: number):Observable<any>{
    
    const url = this.url_mpd + "/cdu/" + idCdu; // URL completa con el ID
    return this.http.delete(url);

  }

}

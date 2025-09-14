import { Injectable } from '@angular/core';
import { Tablatdu } from '../models/tablatdu'
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TablatduService {

  url_mpd: string = environment.env_url_backend;

  constructor(private http:HttpClient) { }

  tablaTduLista():Observable<Tablatdu[]>{
    let direccion = this.url_mpd + "/tdu";
    return this.http.get<Tablatdu[]>(direccion);
  }

  putTablatdu(form:Tablatdu):Observable<any>{
    // Método PUT para actualizar una TDU
    //updateTdu(id: number, body: { nombreCorto: string, descripcionLarga: string }): Observable<any> {
    const url = this.url_mpd + "/tdu/" + form.id; // URL completa con el ID
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { nombreCorto: form.nombreCorto, descripcionLarga: form.descripcionLarga };
    return this.http.put(url, body, { headers });
    //}
  }

  postTablatdu(form:Tablatdu):Observable<any>{

    const url = this.url_mpd + "/tdu/";
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { nombreCorto: form.nombreCorto, descripcionLarga: form.descripcionLarga };
    return this.http.post(url, body, { headers });

  }

  deleteTablatdu(form:Tablatdu):Observable<any>{
    // Método PUT para actualizar una TDU
    //updateTdu(id: number, body: { nombreCorto: string, descripcionLarga: string }): Observable<any> {
    const url = this.url_mpd + "/tdu/" + form.id; // URL completa con el ID
    //const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //const body = { nombreCorto: form.nombreCorto, descripcionLarga: form.descripcionLarga };
    return this.http.delete(url);
    //}
  }

}

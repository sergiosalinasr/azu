import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Tdu, TduCampos } from '../models/tdu';
import { RuntimeConfigService } from '../services/runtime-config.service';

@Injectable({
  providedIn: 'root'
})
export class TduService {
//url_mpd: string = environment.env_url_backend;
  url_mpd: string = environment.env_url_backend;

  constructor(private http:HttpClient,
              private config: RuntimeConfigService
  ) {
    this.url_mpd = this.config.get('env_url_backend')
   }

  tduLista():Observable<Tdu[]>{

    let direccion = this.url_mpd + "/tdu";
    return this.http.get<Tdu[]>(direccion);

  }

  gettducampos():Observable<TduCampos[]>{

    let direccion = this.url_mpd + "/tdu/gettducampos";
    return this.http.get<TduCampos[]>(direccion);

  }

  tduById(id: number):Observable<Tdu[]>{

    let direccion = this.url_mpd + "/tdu/" + id;
    console.log("GET direccion: " + direccion);
    return this.http.get<Tdu[]>(direccion);

  }

  gettdubynombre(nombre: string):Observable<Tdu[]>{

    let direccion = this.url_mpd + "/tdu/gettdubynombre/" + nombre;
    console.log("GET direccion: " + direccion);
    return this.http.get<Tdu[]>(direccion);

  }

  putTdu(form:Tdu):Observable<any>{
    
    const url = this.url_mpd + "/tdu/" + form.id; // URL completa con el ID
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { nombreCorto: form.nombreCorto, descripcionLarga: form.descripcionLarga };
    console.log("putTdu url: " + url)
    return this.http.put(url, body, { headers });
    
  }

  postTdu(form:Tdu):Observable<any>{
    console.log("En postTdu - this.selectedTdu.nombreCorto: " + form.id + form.nombreCorto + 
      " descripcionLarga" + form.descripcionLarga);
    const url = this.url_mpd + "/tdu/";
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { nombreCorto: form.nombreCorto, descripcionLarga: form.descripcionLarga };
    /*
    const body = { 
      nombre: "tdu91", 
      descripcion: "tdu91", 
      fechapublicacion: "2024-12-12", 
      pais: 2 };
    */
    return this.http.post(url, body, { headers });

  }

  deleteTdu(form:Tdu):Observable<any>{
    
    const url = this.url_mpd + "/tdu/" + form.id; // URL completa con el ID
    return this.http.delete(url);

  }

  deleteTduId(idTdu: number):Observable<any>{
    
    const url = this.url_mpd + "/tdu/" + idTdu; // URL completa con el ID
    return this.http.delete(url);

  }

}

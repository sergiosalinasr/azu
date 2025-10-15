import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Riesgo, RiesgoCampos } from '../models/riesgo';
import { RuntimeConfigService } from '../services/runtime-config.service';

@Injectable({
  providedIn: 'root'
})
export class RiesgoService {
//url_mpd: string = environment.env_url_backend;
  url_mpd: string;

  constructor(private http:HttpClient,
              private config: RuntimeConfigService
  ) {
    this.url_mpd = this.config.get('env_url_backend')
   }

  riesgoLista():Observable<Riesgo[]>{

    let direccion = this.url_mpd + "/riesgo";
    return this.http.get<Riesgo[]>(direccion);

  }

  getriesgocampos():Observable<RiesgoCampos[]>{

    let direccion = this.url_mpd + "/riesgo/getriesgocampos";
    return this.http.get<RiesgoCampos[]>(direccion);

  }

  getriesgocamposid_delito(id_delito: number):Observable<RiesgoCampos[]>{
    
        console.log("En getriesgocamposid_delito id_delito=" + id_delito)
        let direccion = this.url_mpd + "/riesgo/getriesgocampos/" + id_delito;
        console.log("GET direccion: " + direccion);
        return this.http.get<RiesgoCampos[]>(direccion);
    
      }

  riesgoById(id: number):Observable<Riesgo[]>{

    let direccion = this.url_mpd + "/riesgo/" + id;
    console.log("GET direccion: " + direccion);
    return this.http.get<Riesgo[]>(direccion);

  }

  getriesgobynombre(nombre: string):Observable<Riesgo[]>{

    let direccion = this.url_mpd + "/riesgo/getriesgobynombre/" + nombre;
    console.log("GET direccion: " + direccion);
    return this.http.get<Riesgo[]>(direccion);

  }

  putRiesgo(form:Riesgo):Observable<any>{
    
    const url = this.url_mpd + "/riesgo/" + form.id; // URL completa con el ID
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { 
      iddelito: form.iddelito, 
      nombre: form.nombre, 
      descripcion: form.descripcion, 
      probabilidad: form.probabilidad, 
      impacto: form.impacto, 
      mitigacion: form.mitigacion };
    console.log("putRiesgo url: " + url)
    return this.http.put(url, body, { headers });
    
  }

  postRiesgo(form:Riesgo):Observable<any>{
    console.log("En postRiesgo - this.selectedRiesgo.nombre: " + form.id + form.nombre + 
      " descripcion: " + form.descripcion);
    const url = this.url_mpd + "/riesgo/";
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { iddelito: form.iddelito, nombre: form.nombre, descripcion: form.descripcion, probabilidad: form.probabilidad, impacto: form.impacto, mitigacion: form.mitigacion };
    /*
    const body = { 
      nombre: "riesgo91", 
      descripcion: "riesgo91", 
      fechapublicacion: "2024-12-12", 
      pais: 2 };
    */
    return this.http.post(url, body, { headers });

  }

  deleteRiesgo(form:Riesgo):Observable<any>{
    
    const url = this.url_mpd + "/riesgo/" + form.id; // URL completa con el ID
    return this.http.delete(url);

  }

  deleteRiesgoId(idRiesgo: number):Observable<any>{
    
    const url = this.url_mpd + "/riesgo/" + idRiesgo; // URL completa con el ID
    return this.http.delete(url);

  }

}


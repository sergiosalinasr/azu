import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Delito, DelitoCampos } from '../models/delito'
import { RuntimeConfigService } from '../services/runtime-config.service';

@Injectable({
  providedIn: 'root'
})
export class DelitoService {
//url_mpd: string = environment.env_url_backend;
  url_mpd: string;

  constructor(private http:HttpClient,
              private config: RuntimeConfigService
  ) {
    this.url_mpd = this.config.get('env_url_backend')
   }

  delitoLista():Observable<Delito[]>{

    let direccion = this.url_mpd + "/delito";
    return this.http.get<Delito[]>(direccion);

  }

  getdelitocampos():Observable<DelitoCampos[]>{

    let direccion = this.url_mpd + "/delito/getdelitocampos";
    return this.http.get<DelitoCampos[]>(direccion);

  }

  getdelitocamposid_ley(id_ley: number):Observable<DelitoCampos[]>{
  
      console.log("En getdelitocamposid_ley id_ley=" + id_ley)
      let direccion = this.url_mpd + "/delito/getdelitocampos/" + id_ley;
      console.log("GET direccion: " + direccion);
      return this.http.get<DelitoCampos[]>(direccion);
  
    }

  delitoById(id: number):Observable<Delito[]>{

    let direccion = this.url_mpd + "/delito/" + id;
    console.log("GET direccion: " + direccion);
    return this.http.get<Delito[]>(direccion);

  }

  getdelitobynombre(nombre: string):Observable<Delito[]>{

    let direccion = this.url_mpd + "/delito/getdelitobynombre/" + nombre;
    console.log("GET direccion: " + direccion);
    return this.http.get<Delito[]>(direccion);

  }

  putDelito(form:Delito):Observable<any>{
    
    const url = this.url_mpd + "/delito/" + form.id; // URL completa con el ID
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { idley: form.idley, nombre: form.nombre, descripcion: form.descripcion, sancion: form.sancion, nivelgravedad: form.nivelgravedad };
    console.log("putDelito url: " + url)
    return this.http.put(url, body, { headers });
    
  }

  postDelito(form:Delito):Observable<any>{
    console.log("En postDelito - this.selectedDelito.nombre: " + form.id + form.nombre + 
      " descripcion: " + form.descripcion +
      " sancion: " + form.sancion +
      " nivelgravedad: " + form.nivelgravedad);
    const url = this.url_mpd + "/delito/";
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { idley: form.idley, nombre: form.nombre, descripcion: form.descripcion, sancion: form.sancion, nivelgravedad: form.nivelgravedad };
    /*
    const body = { 
      nombre: "delito91", 
      descripcion: "delito91", 
      fechapublicacion: "2024-12-12", 
      pais: 2 };
    */
    return this.http.post(url, body, { headers });

  }

  deleteDelito(form:Delito):Observable<any>{
    
    const url = this.url_mpd + "/delito/" + form.id; // URL completa con el ID
    return this.http.delete(url);

  }

  deleteDelitoId(idDelito: number):Observable<any>{
    
    const url = this.url_mpd + "/delito/" + idDelito; // URL completa con el ID
    return this.http.delete(url);

  }

}


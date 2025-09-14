import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Ley, LeyCampos } from '../models/ley'

@Injectable({
  providedIn: 'root'
})
export class LeyService {
url_mpd: string = environment.env_url_backend;

  constructor(private http:HttpClient) { }

  leyLista():Observable<Ley[]>{

    let direccion = this.url_mpd + "/ley";
    return this.http.get<Ley[]>(direccion);

  }

  getleycampos():Observable<LeyCampos[]>{

    let direccion = this.url_mpd + "/ley/getleycampos";
    return this.http.get<LeyCampos[]>(direccion);

  }

  leyById(id: number):Observable<Ley[]>{

    let direccion = this.url_mpd + "/ley/" + id;
    console.log("GET direccion: " + direccion);
    return this.http.get<Ley[]>(direccion);

  }

  getleybynombre(nombre: string):Observable<Ley[]>{

    let direccion = this.url_mpd + "/ley/getleybynombre/" + nombre;
    console.log("GET direccion: " + direccion);
    return this.http.get<Ley[]>(direccion);

  }

  putLey(form:Ley):Observable<any>{
    
    const url = this.url_mpd + "/ley/" + form.id; // URL completa con el ID
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { nombre: form.nombre, descripcion: form.descripcion, fechapublicacion: form.fechapublicacion, pais: form.pais };
    console.log("putLey url: " + url)
    return this.http.put(url, body, { headers });
    
  }

  postLey(form:Ley):Observable<any>{
    console.log("En postLey - this.selectedLey.nombre: " + form.id + form.nombre + 
      " descripcion" + form.descripcion +
      " fechapublicacion" + form.fechapublicacion +
      " pais" + form.pais);
    const url = this.url_mpd + "/ley/";
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { nombre: form.nombre, descripcion: form.descripcion, fechapublicacion: form.fechapublicacion, pais: form.pais };
    /*
    const body = { 
      nombre: "ley91", 
      descripcion: "ley91", 
      fechapublicacion: "2024-12-12", 
      pais: 2 };
    */
    return this.http.post(url, body, { headers });

  }

  deleteLey(form:Ley):Observable<any>{
    
    const url = this.url_mpd + "/ley/" + form.id; // URL completa con el ID
    return this.http.delete(url);

  }

  deleteLeyId(idLey: number):Observable<any>{
    
    const url = this.url_mpd + "/ley/" + idLey; // URL completa con el ID
    return this.http.delete(url);

  }

}

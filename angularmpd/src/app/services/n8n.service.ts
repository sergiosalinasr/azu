import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class N8nService {
//url_n8n: string = environment.env_url_n8n;
url_n8n: string = "http://localhost:3000";
  url_cli: string = "";

  constructor(private http:HttpClient) { }

  postN8n(form:any):Observable<any>{
    console.log("En postN8n - this.selectedN8n.nombre: " + form.chatInput + form.sessionId );
    const url = this.url_n8n + "/n8n/";
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { chatInput: form.chatInput, sessionId: form.sessionId };

    return this.http.post(url, body, { headers });

  };

  postn8nusschat(form:any):Observable<any>{
    console.log("En postN8n - this.selectedN8n.nombre: " + form.chatInput + form.sessionId );

    this.url_cli = "/n8n/postn8nusschat";
    
    const url = this.url_n8n + this.url_cli;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { chatInput: form.chatInput, sessionId: form.sessionId };
    console.log(`postn8nusschat url: ${url}`);
    return this.http.post(url, body, { headers });

  }

  postn8nmutchat(form:any):Observable<any>{
    console.log("En postN8n - this.selectedN8n.nombre: " + form.chatInput + form.sessionId );

    this.url_cli = "/n8n/postn8nmutchat";
    
    const url = this.url_n8n + this.url_cli;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { chatInput: form.chatInput, sessionId: form.sessionId };
    console.log(`postn8nmutchat url: ${url}`);
    return this.http.post(url, body, { headers });

  }

  postn8nxxxchat(form:any):Observable<any>{
    console.log("En postN8n - this.selectedN8n.nombre: " + form.chatInput + form.sessionId );
    
    switch (form.id_cliente) {
      case "uss":
        console.log("Opción 1");
        this.url_cli = this.url_n8n + "/n8n/postn8nusschat";
        break;
      case 2:
        console.log("Opción 2");
        this.url_cli = this.url_n8n + "/n8n/postn8nusschat";
        break;
      case 3:
        console.log("Opción 3");
        this.url_cli = "/n8n/postn8nusschat";
        break;
      default:
        console.log("Ninguna opción");
    }
    
    const url = this.url_n8n + this.url_cli;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { chatInput: form.chatInput, sessionId: form.sessionId };

    return this.http.post(url, body, { headers });

  }

}


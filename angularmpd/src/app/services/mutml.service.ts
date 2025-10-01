import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MutmlService {
  //url_n8n: string = environment.env_url_n8n;
  //url_mutml: string = "http://localhost:8000";
  url_mutml: string = "http://localhost:3000";
  url_cli: string = "";

  constructor(private http:HttpClient) { }

  postmutml(form:any):Observable<any>{
    console.log("En postmutml - form.chatInput: " + form.chatInput );

    //this.url_cli = "/logreg2_1";
    this.url_cli = "/mutml/mod01";
    
    const url = this.url_mutml + this.url_cli;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { texts: [form.chatInput] };
    console.log(`postmutml url: ${url}`);
    return this.http.post(url, body, { headers });

  }

}


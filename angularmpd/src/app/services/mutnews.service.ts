import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MutnewsService {
  //url_n8n: string = environment.env_url_n8n;
  //url_mutnews: string = "http://localhost:8000";
  url_mutnews: string = "http://localhost:3000";
  url_cli: string = "";

  constructor(private http:HttpClient) { }

  postmutnews(form:any):Observable<any>{
    console.log("En postmutnews - form.chatInput: " + form.chatInput );

    //this.url_cli = "/news_logreg";
    this.url_cli = "/mutml/mod02";
    
    const url = this.url_mutnews + this.url_cli;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { texts: [form.chatInput] };
    console.log(`postmutnews url: ${url}`);
    return this.http.post(url, body, { headers });

  }

}
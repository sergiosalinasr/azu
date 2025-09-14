import { Injectable } from '@angular/core';
import { LoginI} from '../../modelos/login.interface';
import { ResponseI } from '../../modelos/response.interface';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError, interval, Subscription } from 'rxjs';
import { tick } from '@angular/core/testing';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { RuntimeConfigService } from '../../services/runtime-config.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //env_url_backend = environment.env_url_backend;
  env_url_backend: string;
  url:string = "http://localhost:4000/"
  url_club: string = "http://45.236.128.235:8000/"
  private tokenEndpoint = 'http://localhost:8081/auth/realms/master/protocol/openid-connect/token';
  //private nodetokenEndpoint = this.env_url_backend + '/login';
  nodetokenEndpoint: string;
  //private noderefresh_tokenEndpoint = this.env_url_backend + '/refreshtoken';
  noderefresh_tokenEndpoint: string;
 //private sigUpNodeEndpoint = this.env_url_backend + '/SignUp';
  sigUpNodeEndpoint: string;
  private keycloakUrl = "http://localhost:8081/auth"
  private realm = "master"
  //private nodetokenEndpointcookie = this.env_url_backend + '/logincookie';
  nodetokenEndpointcookie: string;
  //private noderefresh_tokenEndpointcookie = this.env_url_backend + '/refreshtokencookie';
  noderefresh_tokenEndpointcookie: string;
  

  constructor(private http:HttpClient,
    private config: RuntimeConfigService
    ) { 
      this.env_url_backend = this.config.get('env_url_backend');
      this.nodetokenEndpoint = this.env_url_backend + '/login';
      this.noderefresh_tokenEndpoint = this.env_url_backend + '/refreshtoken';
      this.sigUpNodeEndpoint = this.env_url_backend + '/SignUp';
      this.nodetokenEndpointcookie = this.env_url_backend + '/logincookie';
      this.noderefresh_tokenEndpointcookie = this.env_url_backend + '/refreshtokencookie';
    }


  // este servicio en vez de acceder directamente a Keycloak, lo hace a através de un servicio node que si accede a keycloak
  loginNode(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const body = JSON.stringify({
      username: username,
      password: password
    });

    return this.http.post(this.nodetokenEndpoint, body, { headers }).pipe(
      catchError(error => {
        console.log("Angular - error.status="+error.status)
        // Aquí puedes manejar errores específicos
        // Por ejemplo, si error.status es 0 o 504, podría indicar que el endpoint no está disponible
        if (error.status === 0 || error.status === 504) {
          //console.error('El servicio de autenticación no está disponible.');
          // Puedes devolver un observable con un mensaje específico o manejarlo como prefieras
          return throwError(error);
        }
        // Reenviar el error si no es uno que estés manejando específicamente
        return throwError(error);
      })
    );
  }

  // este servicio refresca el actual token
  refresh_tokenNode( refresh_token: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const body = JSON.stringify({
      refresh_token: refresh_token
    });

    return this.http.post(this.noderefresh_tokenEndpoint, body, { headers }).pipe(
      catchError(error => {
        console.log("Angular - error.status="+error.status)
        // Aquí puedes manejar errores específicos
        // Por ejemplo, si error.status es 0 o 504, podría indicar que el endpoint no está disponible
        if (error.status === 0 || error.status === 504) {
          //console.error('El servicio de autenticación no está disponible.');
          // Puedes devolver un observable con un mensaje específico o manejarlo como prefieras
          return throwError(error);
        }
        // Reenviar el error si no es uno que estés manejando específicamente
        return throwError(error);
      })
    );
  }

  // este servicio en vez de acceder directamente a Keycloak, lo hace a através de un servicio node que si accede a keycloak
  signUpNode(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const body = JSON.stringify({
      username: username,
      password: password
    });

    return this.http.post(this.sigUpNodeEndpoint, body, { headers }).pipe(
      catchError(error => {
        console.log("Angular - error.status="+error.status)
        // Aquí puedes manejar errores específicos
        // Por ejemplo, si error.status es 0 o 504, podría indicar que el endpoint no está disponible
        if (error.status === 0 || error.status === 504) {
          //console.error('El servicio de autenticación no está disponible.');
          // Puedes devolver un observable con un mensaje específico o manejarlo como prefieras
          return throwError(error);
        }
        // Reenviar el error si no es uno que estés manejando específicamente
        return throwError(error);
      })
    );
  }

  // Token con cookie

  // este servicio en vez de acceder directamente a Keycloak, lo hace a através de un servicio node que si accede a keycloak
  loginNodeCookie(username: string, password: string): Observable<any> {
    console.log("loginNodeCookie...");
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const body = JSON.stringify({
      username: username,
      password: password
    });

    console.log("loginNodeCookie: POST: " + this.nodetokenEndpointcookie);
    return this.http.post(this.nodetokenEndpointcookie, body, { headers, withCredentials: true }).pipe(
      catchError(error => {
        console.log("Angular - error.status="+error.status)
        // Aquí puedes manejar errores específicos
        // Por ejemplo, si error.status es 0 o 504, podría indicar que el endpoint no está disponible
        if (error.status === 0 || error.status === 504) {
          //console.error('El servicio de autenticación no está disponible.');
          // Puedes devolver un observable con un mensaje específico o manejarlo como prefieras
          return throwError(error);
        }
        // Reenviar el error si no es uno que estés manejando específicamente
        return throwError(error);
      })
    );
  }

  // este servicio refresca el actual token
  refresh_tokenNodeCookie(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.noderefresh_tokenEndpointcookie, {}, { headers, withCredentials: true }).pipe(
      catchError(error => {
        console.log("Angular - error.status=" + error.status);
        if (error.status === 0 || error.status === 504) {
          return throwError('El servicio de autenticación no está disponible.');
        }
        return throwError(error);
      })
    );
  }

}

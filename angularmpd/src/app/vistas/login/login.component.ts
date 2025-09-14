import { Component } from '@angular/core';

import { FormGroup, FormControl, Validator, Validators} from '@angular/forms'
import { ApiService} from '../../servicios/api/api.service';
import { LoginI} from '../../modelos/login.interface';
import { ResponseI} from '../../modelos/response.interface'
import { environment } from '../../../environments/environment';
import { AlertasService } from '../../servicios/alertas/alertas.service';
import { AuthService } from '../../services/auth.service';
import { RuntimeConfigService } from '../../services/runtime-config.service';


import { Router } from '@angular/router'
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  //version = environment.appVersion;
  version: string;
  //env_empresa = environment.env_empresa;
  env_empresa : string;
  //env_empresa_logo: string = environment.env_empresa_logo;
  env_empresa_logo: string;
  errorMessage: string = '';
  v_token: string = '';

  // Estado del mensaje
  message: string = '';
  messageType: 'success' | 'error' = 'success';
  
  loginForm = new FormGroup({
    usuario : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  })

  constructor(private api:ApiService, private authService: AuthService, private router:Router, private alertas:AlertasService,
    private config: RuntimeConfigService
  ) {
    this.version = this.config.get('appVersion');
    this.env_empresa = this.config.get('env_empresa');
    this.env_empresa_logo = this.config.get('env_empresa_logo');
  }

  errorStatus:boolean = false;
  errorMsj:any = "";

  ngOnInit(): void{
    console.log("login-ngOnInit");
    this.checkLocalStorage();
    this.alertas.currentMessage.subscribe(msg => this.message = msg);
    this.alertas.currentMessageType.subscribe(type => this.messageType = type);

  }

  checkLocalStorage(){
    console.log("checkLocalStorage")
    if(localStorage.getItem('token')){
      console.log("checkLocalStorage: navigate(['menulateral'])")
      this.router.navigate(['menulateral'])
    }
  }


  // El usuario ingresa un par de credenciales...
  onLogin(form:any){
    
    // Validando usuario y clave...
    if (!this.loginForm.valid) {
      this.alertas.showMessage('Error: Ingrese usuario y password', 'error');
      this.loginForm.markAllAsTouched(); // Hace que todos los controles se marquen como "touched" para mostrar errores
      
    } else {
      // Aquí maneja la lógica de envío del formulario, como enviarlo a un servidor
      this.alertas.showMessage('Intentando login...', 'success');
      this.api.loginNode(form.usuario, form.password).subscribe({
        next: (data) => {
          console.log("data:"+data.refresh_token);
          this.authService.saveToken(
            data.access_token, // Token del backend.
            data.expires_in,    // Tiempo en segundos desde la respuesta del backend.
            data.refresh_token
          );

          // configuración de la renovación del token
          console.log("login->setTokenExpiration")
          this.authService.setTokenExpiration(data.expires_in * 1000);
          
          this.alertas.showMessage('Login exitoso.', 'success');
  
          //this.router.navigate(['dashboard'])
          this.router.navigate(['menulateral'])
  
        },
        error: (error) => {
          console.error('Error de login:', error);
          this.alertas.showMessage('Error de login en el servidor...', 'error');
          this.handleLoginError(error);
        }
      })
    }
    
  }

  // El usuario ingresa un par de credenciales...
  onLoginCookie(form:any){
    console.log("onLoginCookie...")
    
    // Validando usuario y clave...
    if (!this.loginForm.valid) {
      this.alertas.showMessage('Error: Ingrese usuario y password', 'error');
      this.loginForm.markAllAsTouched(); // Hace que todos los controles se marquen como "touched" para mostrar errores
      
    } else {
      // Aquí maneja la lógica de envío del formulario, como enviarlo a un servidor
      this.alertas.showMessage('Intentando login...', 'success');
      this.api.loginNodeCookie(form.usuario, form.password).subscribe({
        next: (data) => {
          this.authService.saveTokenCookie(
            data.access_token, // Token del backend.
            data.expires_in    // Tiempo en segundos desde la respuesta del backend.
          );

          this.authService.startTokenRefreshCheck();

          // configuración de la renovación del token
          //this.authService.setTokenExpiration(data.expires_in * 1000);
          
          //this.alertas.showMessage('Login exitoso.', 'success');
          console.log('onLoginCookie: Login exitoso.');
  
          //this.router.navigate(['dashboard'])
          console.log('onLoginCookie: Navegando a menulateral...');
          this.router.navigate(['menulateral'])
  
        },
        error: (error) => {
          console.error('Error de login:', error);
          this.alertas.showMessage('Error de login en el servidor...', 'error');
          this.handleLoginError(error);
        }
      })
    } 
  }

  // Método para manejar errores de login
  handleLoginError(error: any) {
    // Aquí se personalizar el manejo de errores basado en el error recibido
    if (error.status === 0 || error.status === 504) {
      this.errorMessage = 'El servicio de autenticación no está disponible.';
      this.alertas.showSuccess(error.HttpErrorResponse, this.errorMessage);
    } else if (error.error && error.error.error_description) {
      this.errorMessage = error.error.error_description;
      this.alertas.showSuccess(error.HttpErrorResponse, this.errorMessage);
    } else {
      this.errorMessage = 'Ocurrió un error durante la autenticación.';
      this.alertas.showSuccess(error.HttpErrorResponse, this.errorMessage);
    }
  }

  // El usuario ingresa un par de credenciales...
  nuevoUsuario(form:any){
    
    // Validando usuario y clave...
    console.log("Validando usuario y clave...");
    if (!this.loginForm.valid) {
      console.log('Error: ingrese un formato de usuario y Password válidos');
      this.alertas.showMessage('Nuevo usuario no es satisfactorio', 'error');
      this.loginForm.markAllAsTouched(); // Hace que todos los controles se marquen como "touched" para mostrar errores
      
    } else {
      console.log('El formato de usuario y Password válidos', this.loginForm.value);
      // Aquí manejarías la lógica de envío del formulario, como enviarlo a un servidor
      this.alertas.showSuccess('Intentando SignUp...', 'Procesando');
      this.api.signUpNode(form.usuario, form.password).subscribe({
        next: (data) => {
          //Las credenciales son válidas. Procesar la respuesta exitosa aquí (por ejemplo, redirigir al usuario o almacenar el token)
          
          localStorage.setItem("token",data.access_token);
          
          this.alertas.showSuccess('SignUp exitoso.', 'Hecho');
  
          this.router.navigate(['dashboard'])
  
        },
        error: (error) => {
          console.error('Error de SignUp:', error);
          this.alertas.showSuccess('Error de SignUp...', 'En el servidor');
          this.handleLoginError(error);
        }
      })
    }
    
  }
  

}

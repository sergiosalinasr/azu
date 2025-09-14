import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { N8nService } from '../../services/n8n.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './n8nchat.component.html',
  styleUrls: ['./n8nchat.component.css']
})
export class N8nchatComponent {
  userInput: string = '';
  sessionId: string = '1234567';
  chatHistory: { role: string, message: string }[] = [];
  id_Cliente: any = "";

  constructor(private n8nService:N8nService,
    private activerouter:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activerouter.paramMap.subscribe(params => {
    this.id_Cliente = params.get('id_cliente');
    console.log("En n8nchat/ngOnInit id_cliente=" + this.id_Cliente);

    // 👉 en caso de refrescar el chat al cambiar cliente
    //this.chatHistory = [];
  });
}

  sendMessage() {
    if (!this.userInput.trim()) {
      return;
    }

    // Agregar mensaje del usuario al historial
    this.chatHistory.push({ role: 'user', message: this.userInput });
  
    const payload = {
      chatInput: this.userInput,
      sessionId: this.sessionId
    };

    console.log("POST: this.selectedN8n: ")
    // Limpiar mensaje
    this.userInput = "Buscando..."
    this.n8nService.postn8nusschat(payload).subscribe({
              next: (res) => {
        this.chatHistory.push({ role: 'bot', message: res?.output || 'No hay respuesta.' });
        this.userInput = ''; // limpiar input
      },
      error: (err) => {
        console.error('Error en la solicitud:', err);
        this.chatHistory.push({ role: 'bot', message: 'Error en el servidor.' });
      }
    });
    

  }

  clearStorage() {
    localStorage.clear();
    sessionStorage.clear();
    document.cookie.split(';').forEach(cookie => {
      const name = cookie.trim().split('=')[0];
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });
    this.chatHistory.push({ role: 'system', message: 'Cookies y almacenamiento local borrados.' });
  }
}

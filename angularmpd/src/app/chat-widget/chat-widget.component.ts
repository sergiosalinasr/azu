import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.css']
})
export class ChatWidgetComponent {
  userInput: string = '';
  messages: { from: string, text: string }[] = [];

  webhookUrl: string = 'http://localhost:5678/webhook/259f2614-70db-4bc8-b5df-583bb70a9708/chat';

  constructor(private http: HttpClient) {}

  sendMessage() {
    if (!this.userInput.trim()) return;

    const userMsg = this.userInput;
    const sessionId = localStorage.getItem('chatSessionId') || crypto.randomUUID();
    localStorage.setItem('chatSessionId', sessionId);
    this.messages.push({ from: 'Tú', text: userMsg });
    this.userInput = '';


    this.http.post<any>(this.webhookUrl, { chatInput: userMsg, sessionId: sessionId }).subscribe(
      res => {
        console.log('n8n res:' + res[0].output)
        const reply = Array.isArray(res) && res.length > 0 && res[0].output ? res[0].output : null;
        if (reply) {
          this.messages.push({ from: 'Asistente', text: reply });
        } else {
          this.messages.push({ from: 'Asistente', text: 'Respuesta no recibida.' });
        }
      },
      err => {
        this.messages.push({ from: 'Asistente', text: 'Error al contactar al asistente.' });
      }
    );
  }
}


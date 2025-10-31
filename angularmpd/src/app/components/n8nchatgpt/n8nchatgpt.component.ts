import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { N8nService } from '../../services/n8n.service';
import { ActivatedRoute } from '@angular/router';

@Component({
selector: 'app-chat',
templateUrl: './n8nchatgpt.component.html',
styleUrls: ['./n8nchatgpt.component.css']
})
export class N8nchatgptComponent implements AfterViewChecked {
@ViewChild('chatHistoryContainer') private chatHistoryContainer!: ElementRef;

userInput: string = '';
sessionId: string = '1234567';
chatHistory: { role: string, message: string }[] = [];
id_Cliente: any = "";

private shouldScroll = false;

constructor(
private n8nService: N8nService,
private activerouter: ActivatedRoute
) { }

ngOnInit(): void {
this.activerouter.paramMap.subscribe(params => {
this.id_Cliente = params.get('id_cliente');
console.log("En n8nchatgpt/ngOnInit id_cliente=" + this.id_Cliente);
// En caso de refrescar el chat al cambiar cliente:
// this.chatHistory = [];
});
}

ngAfterViewChecked() {
if (this.shouldScroll) {
this.scrollToBottom();
this.shouldScroll = false;
}
}

sendMessage() {
if (!this.userInput.trim()) {
return;
}

// Agregar mensaje del usuario al historial
this.chatHistory.push({ role: 'user', message: this.userInput });
this.shouldScroll = true;

const payload = {
chatInput: this.userInput,
sessionId: this.sessionId
};

// Indicar que estamos esperando respuesta
this.userInput = "Buscando...";

this.n8nService.postn8nchatgpt(payload).subscribe({
next: (res) => {
this.chatHistory.push({ role: 'bot', message: res?.output || 'No hay respuesta.' });
this.shouldScroll = true;
this.userInput = '';
},
error: (err) => {
console.error('Error en la solicitud:', err);
this.chatHistory.push({ role: 'bot', message: 'Error en el servidor.' });
this.shouldScroll = true;
this.userInput = '';
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
this.shouldScroll = true;
}

private scrollToBottom(): void {
try {
const container = this.chatHistoryContainer.nativeElement;
container.scrollTop = container.scrollHeight;
} catch (err) {
console.error('No se pudo hacer scroll:', err);
}
}
}
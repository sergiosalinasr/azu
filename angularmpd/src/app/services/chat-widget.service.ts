import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatWidgetService {
  
  private isLoaded = false;
  private scriptElement: HTMLScriptElement | null = null;

  loadWidget(): void {
    if (this.isLoaded) return;

    (window as any).ChatWidgetConfig = {
      webhook: {
        url: 'http://localhost:5678/webhook/3763bcb5-ce28-4020-b9a5-243765e747dd/chat',
        route: 'general'
      },
      branding: {
        // Usa una imagen que funcione o un data URI
        logo: 'assets/azurian_logo.jpg',
        name: 'AzurianPMO',
        welcomeText: 'Hola , como puedo ayudarte?',
        responseTimeText: 'respondemos rapidamente',
        poweredBy: {
          text: 'Powered by AzurianCode',
          link: 'https://azurian.com'
        }
      },
      style: {
        primaryColor: '#4fff6cff',
        secondaryColor: '#4fff6cff',
        position: 'right',
        backgroundColor: '#fafafaff',
        fontColor: '#000000ff',
        poweredByColor: '#854fff'
      }
    };

    setTimeout(() => {
      this.scriptElement = document.createElement('script');
      this.scriptElement.src = 'https://nocodeveloper.com/chat.js';
      this.scriptElement.async = true;
      
      this.scriptElement.onload = () => {
        console.log('Chat widget loaded successfully');
      };
      
      this.scriptElement.onerror = () => {
        console.error('Error loading chat widget script');
      };
      
      document.head.appendChild(this.scriptElement);
    }, 100);
    
    this.isLoaded = true;
  }

  removeWidget(): void {
    if (this.scriptElement) {
      document.head.removeChild(this.scriptElement);
      this.scriptElement = null;
    }
    
    const widgetElements = document.querySelectorAll('.n8n-chat-widget');
    widgetElements.forEach(element => element.remove());
    
    if ((window as any).ChatWidgetConfig) {
      delete (window as any).ChatWidgetConfig;
    }
    
    if ((window as any).N8NChatWidgetInitialized) {
      delete (window as any).N8NChatWidgetInitialized;
    }
    
    this.isLoaded = false;
  }
}
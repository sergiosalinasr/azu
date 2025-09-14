import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ChatWidgetConfig {
  webhook: {
    url: string;
    route: string;
  };
  branding: {
    logo: string;
    name: string;
    welcomeText: string;
    responseTimeText: string;
    poweredBy: {
      text: string;
      link: string;
    };
  };
  style: {
    primaryColor: string;
    secondaryColor: string;
    position: 'left' | 'right';
    backgroundColor: string;
    fontColor: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class N8nWidget2Service {
  private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);
  public messages$ = this.messagesSubject.asObservable();
  
  private currentSessionId: string = '';
  private config: ChatWidgetConfig | null = null;

  constructor(private http: HttpClient) {}

  setConfig(config: ChatWidgetConfig): void {
    this.config = config;
  }

  generateSessionId(): string {
    return crypto.randomUUID();
  }

  startNewConversation(): Promise<void> {
    console.log('startNewConversation called');
    if (!this.config) {
      console.error('Widget config not set');
      return Promise.reject(new Error('Widget config not set'));
    }

    this.currentSessionId = this.generateSessionId();
    console.log('Generated session ID:', this.currentSessionId);
    
    const data = [{
      action: "loadPreviousSession",
      sessionId: this.currentSessionId,
      route: this.config.webhook.route,
      metadata: {
        userId: ""
      }
    }];

    console.log('Sending data to n8n:', data);
    console.log('Webhook URL:', this.config.webhook.url);

    return this.http.post<any>(this.config.webhook.url, data).toPromise()
      .then((response) => {
        console.log('Response from n8n:', response);
        const botMessage: ChatMessage = {
          id: this.generateSessionId(),
          content: Array.isArray(response) ? response[0].output : response.output,
          isUser: false,
          timestamp: new Date()
        };
        
        console.log('Adding bot message:', botMessage);
        this.addMessage(botMessage);
      })
      .catch((error) => {
        console.error('Error starting conversation:', error);
        throw error;
      });
  }

  sendMessage(message: string): Promise<void> {
    if (!this.config || !this.currentSessionId) {
      return Promise.reject(new Error('Conversation not started'));
    }

    // Add user message
    const userMessage: ChatMessage = {
      id: this.generateSessionId(),
      content: message,
      isUser: true,
      timestamp: new Date()
    };
    this.addMessage(userMessage);

    const messageData = {
      action: "sendMessage",
      sessionId: this.currentSessionId,
      route: this.config.webhook.route,
      chatInput: message,
      metadata: {
        userId: ""
      }
    };

    return this.http.post<any>(this.config.webhook.url, messageData).toPromise()
      .then((response) => {
        const botMessage: ChatMessage = {
          id: this.generateSessionId(),
          content: Array.isArray(response) ? response[0].output : response.output,
          isUser: false,
          timestamp: new Date()
        };
        
        this.addMessage(botMessage);
      })
      .catch((error) => {
        console.error('Error sending message:', error);
        throw error;
      });
  }

  private addMessage(message: ChatMessage): void {
    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next([...currentMessages, message]);
  }

  clearMessages(): void {
    this.messagesSubject.next([]);
    this.currentSessionId = '';
  }

  getMessages(): ChatMessage[] {
    return this.messagesSubject.value;
  }
}
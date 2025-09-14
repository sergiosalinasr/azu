import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { N8nWidget2Service, ChatWidgetConfig, ChatMessage } from '../../services/n8nwidget2.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-n8n-widget2',
  templateUrl: './n8nwidget2.component.html',
  styleUrls: ['./n8nwidget2.component.css']
})
export class N8nwidget2Component implements OnInit, OnDestroy, AfterViewChecked {
  @Input() config: ChatWidgetConfig = {
    webhook: {
      url: 'http://localhost:5678/webhook/c6e9579c-f510-4254-9112-bfb0c0d31908/chat',
      route: 'general'
    },
    branding: {
      logo: 'assets/azurian_logo.jpg',
      name: 'AzurianPMO',
      welcomeText: 'Hola, ¿cómo puedo ayudarte?',
      responseTimeText: 'Respondemos rápidamente',
      poweredBy: {
        text: 'Powered by AzurianCode',
        link: 'https://azurian.com'
      }
    },
    style: {
      primaryColor: '#4fff6c',
      secondaryColor: '#4fff6c',
      position: 'right',
      backgroundColor: '#fafafa',
      fontColor: '#000000'
    }
  };

  @ViewChild('messagesContainer', { static: false }) messagesContainer!: ElementRef;
  @ViewChild('messageInput', { static: false }) messageInput!: ElementRef;

  public isOpen = false;
  public showChatInterface = false;
  public messages: ChatMessage[] = [];
  public currentMessage = '';
  public isLoading = false;

  private messagesSubscription?: Subscription;

  constructor(private chatService: N8nWidget2Service) {}

  ngOnInit(): void {
    this.chatService.setConfig(this.config);
    this.messagesSubscription = this.chatService.messages$.subscribe(
      messages => {
        this.messages = messages;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  toggleWidget(): void {
    this.isOpen = !this.isOpen;
  }

  closeWidget(): void {
    this.isOpen = false;
  }

  startNewChat(): void {
    console.log('startNewChat called');
    this.isLoading = true;
    this.chatService.startNewConversation()
      .then(() => {
        console.log('Conversation started successfully');
        this.showChatInterface = true;
        this.isLoading = false;
      })
      .catch((error) => {
        console.error('Error starting chat:', error);
        this.isLoading = false;
        // Mostrar mensaje de error al usuario si es necesario
      });
  }

  sendMessage(): void {
    if (!this.currentMessage.trim() || this.isLoading) return;

    const message = this.currentMessage.trim();
    this.currentMessage = '';
    this.isLoading = true;

    this.chatService.sendMessage(message)
      .then(() => {
        this.isLoading = false;
      })
      .catch((error) => {
        console.error('Error sending message:', error);
        this.isLoading = false;
        // Restaurar el mensaje si hay error
        this.currentMessage = message;
      });
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  private scrollToBottom(): void {
    if (this.messagesContainer) {
      try {
        this.messagesContainer.nativeElement.scrollTop = 
          this.messagesContainer.nativeElement.scrollHeight;
      } catch (err) {
        console.error('Error scrolling to bottom:', err);
      }
    }
  }

  // Getter para aplicar estilos dinámicos
  get widgetStyles() {
    return {
      '--primary-color': this.config.style.primaryColor,
      '--secondary-color': this.config.style.secondaryColor,
      '--background-color': this.config.style.backgroundColor,
      '--font-color': this.config.style.fontColor
    };
  }

  get positionClass(): string {
    return this.config.style.position === 'left' ? 'position-left' : 'position-right';
  }
}
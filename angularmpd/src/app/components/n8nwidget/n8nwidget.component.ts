import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatWidgetService } from '../../services/chat-widget.service';

@Component({
  selector: 'app-n8nwidget',
  templateUrl: './n8nwidget.component.html',
  styleUrls: ['./n8nwidget.component.css']
})
export class N8nwidgetComponent implements OnInit, OnDestroy {
  
  constructor(private chatWidgetService: ChatWidgetService) {}

  ngOnInit(): void {
    console.log('Iniciando widget de chat...');
    this.chatWidgetService.loadWidget();
    
    // Verificar después de 2 segundos que todo esté cargado
    setTimeout(() => {
      console.log('ChatWidgetConfig:', (window as any).ChatWidgetConfig);
      console.log('N8NChatWidgetInitialized:', (window as any).N8NChatWidgetInitialized);
      
      // Verificar si el widget está en el DOM
      const widgetElement = document.querySelector('.n8n-chat-widget');
      console.log('Widget en DOM:', widgetElement);
    }, 2000);
  }

  ngOnDestroy(): void {
    this.chatWidgetService.removeWidget();
  }
}
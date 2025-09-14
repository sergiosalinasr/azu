import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../servicios/api/api.service';
import { AlertasService } from '../servicios/alertas/alertas.service';
import { ChatWidgetService } from '../services/chat-widget.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menulateral',
  templateUrl: './menulateral.component.html',
  styleUrls: ['./menulateral.component.css']
})
export class MenulateralComponent implements OnInit {

  errorMessage: string = '';
  menuOptions: any[] = [];   // <-- antes estaba hardcodeado

  activeSubmenu: number | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private api: ApiService,
    private alertas: AlertasService,
    private chatWidgetService: ChatWidgetService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    console.log('Iniciando widget de chat...');
    this.chatWidgetService.loadWidget();

    // cargar menú desde JSON
    this.http.get<any[]>('assets/menu.json').subscribe({
      next: (data) => {
        this.menuOptions = data;
      },
      error: (err) => {
        console.error('Error cargando menú:', err);
      }
    });

    // Verificar después de 2 segundos que todo esté cargado
    setTimeout(() => {
      console.log('ChatWidgetConfig:', (window as any).ChatWidgetConfig);
      console.log('N8NChatWidgetInitialized:', (window as any).N8NChatWidgetInitialized);

      const widgetElement = document.querySelector('.n8n-chat-widget');
      console.log('Widget en DOM:', widgetElement);
    }, 2000);
  }

  ngOnDestroy(): void {
    this.chatWidgetService.removeWidget();
  }

   toggleSubmenuCookie_NoVa(optionId: number): void {
    this.activeSubmenu = this.activeSubmenu === optionId ? null : optionId;
  }
  
  toggleSubmenu(optionId: number): void {
    if (this.authService.isTokenExpiringSoon()) {
      console.log('toggleSubmenu: El token está por expirar. Renovando...');
      this.authService.renewToken();
    }
    this.activeSubmenu = this.activeSubmenu === optionId ? null : optionId;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  navigate(option: any): void {
    if (option.externalUrl) {
      window.open(option.externalUrl, '_blank');
    } else if (option.route) {
      console.log(`Navegando a ${option.route}`)
      this.router.navigate(["/menulateral/cdley"]);
      this.router.navigate([option.route]);
    } else if (option.title === 'Logout') {
      this.logout();
    }
  }

  puedeVerOpcion(rolesPermitidos: string[] = []): boolean {
    if (!rolesPermitidos || rolesPermitidos.length === 0) return true;
    return this.authService.hasAnyRole(rolesPermitidos);
  }
}


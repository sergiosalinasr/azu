import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RuntimeConfigService } from '../../services/runtime-config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  //env_empresa = environment.env_empresa;
  //env_nombre_sistema = environment.env_nombre_sistema;
  //version = environment.appVersion;

  env_empresa: string;
  env_nombre_sistema: string;
  version: string;

  constructor(
      private config: RuntimeConfigService
    ) {
      this.version = this.config.get('appVersion');
      this.env_empresa = this.config.get('env_empresa');
      this.env_nombre_sistema = this.config.get('env_nombre_sistema');
    }

}

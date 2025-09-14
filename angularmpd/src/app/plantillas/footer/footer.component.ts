import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  env_empresa = environment.env_empresa;
  env_empresa_url: string = environment.env_empresa_url;
}

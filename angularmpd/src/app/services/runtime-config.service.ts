// src/app/services/runtime-config.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RuntimeConfigService {
  private config: any;

  loadConfig(): Promise<void> {
    return fetch('/assets/env.json')
      .then(response => response.json())
      .then(config => { this.config = config; });
  }

  get(key: string): any {
    return this.config ? this.config[key] : null;
  }
}

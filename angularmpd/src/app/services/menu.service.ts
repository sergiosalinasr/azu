// src/app/services/menu.service.ts
import { Injectable } from '@angular/core';
import { MenuItem } from '../modelos/menu-item.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  menuItems: MenuItem[] = [
    {
      label: 'Opcion1',
      path: '/opcion1',
      children: [
        { label: 'Subopcion1-1', path: '/opcion1/subopcion1' },
        { label: 'Subopcion1-2', path: '/opcion1/subopcion2' }
      ]
    },
    {
      label: 'Opcion2',
      path: '/opcion2',
      children: [
        { label: 'Subopcion2-1', path: '/opcion2/subopcion1' },
        { label: 'Subopcion2-2', path: '/opcion2/subopcion2' }
      ]
    }
  ];

  constructor() { }

  getMenuItems(): MenuItem[] {
    return this.menuItems;
  }
}

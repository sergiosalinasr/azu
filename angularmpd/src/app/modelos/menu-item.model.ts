// src/app/modelos/menu-item.model.ts
export interface MenuItem {
    label: string;
    path: string;
    children?: MenuItem[];  // Las subopciones son también MenuItem
  }
  
// src/app/components/menu/menu.component.ts
import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../modelos/menu-item.model';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuItems: MenuItem[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.menuItems = this.menuService.getMenuItems();
  }
}


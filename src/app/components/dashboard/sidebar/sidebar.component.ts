import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ItemMenu } from '../../../interfaces/itemMenu';
import { MenuService } from '../../../services/item-menu.service';


/**
 * @title Autosize sidenav
 */
@Component({
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Input() isExpanded: boolean;
  @Output() toggleMenu = new EventEmitter();

  menu: ItemMenu[] = []
  showSubmenu: boolean = false;
  isShowing = true;
  showSubSubMenu: boolean = false;

  constructor(private _menuService: MenuService) {}

  ngOnInit(): void {
    this.cargarMenu();
  }

  cargarMenu() {
    this._menuService.getMenu().subscribe(data => {
      this.menu = data
    })
  }


  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}
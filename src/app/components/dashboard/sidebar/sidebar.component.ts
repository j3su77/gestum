import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ItemMenu } from '../../../interfaces/itemMenu';
import { MenuService } from '../../../services/item-menu.service';
import { ThemeService } from '../../../services/theme.service';

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
  public isMobile = false;


  constructor(private _menuService: MenuService,  private _themeService: ThemeService) {}

  ngOnInit(): void {
    this.cargarMenu();
    
    this._themeService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
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
import { Injectable, Renderer2, RendererFactory2, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private darkMode = false;
  isExpanded = false;
  private isExpandedSubject = new BehaviorSubject<boolean>(false);
  private isMobileSubject = new BehaviorSubject<boolean>(false);

  isExpanded$ = this.isExpandedSubject.asObservable();
  isMobile$ = this.isMobileSubject.asObservable();
  isMobile = false;

  constructor(private overlayContainer: OverlayContainer, private rendererFactory: RendererFactory2) { 
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.checkIfMobile();
    this.darkMode = (localStorage.getItem("isDark") === "true") || false;
    this.setDarkMode(this.darkMode)
  }

  checkIfMobile() {
    this.isMobileSubject.next(window.matchMedia('(max-width: 767px)').matches);
  }
 
  toggleMenu() {
    this.isExpandedSubject.next(!this.isExpandedSubject.value);
  }
  getIsExpanded() {
    return this.isExpandedSubject.value;
  }

  async setDarkMode(isDarkMode: boolean) {
    console.log("hola");
    this.darkMode = isDarkMode;
    localStorage.setItem("isDark", JSON.stringify(this.darkMode))
    if (this.darkMode) {
      await this.renderer.addClass(document.body, 'dark-theme-colors');
    } else {
      await this.renderer.removeClass(document.body, 'dark-theme-colors');
    }
  }
}
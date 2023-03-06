import { Injectable, Renderer2, RendererFactory2, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';


@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private darkMode = false;
  
  constructor(private overlayContainer: OverlayContainer, private rendererFactory: RendererFactory2) { 
    this.renderer = this.rendererFactory.createRenderer(null, null);
  
    this.darkMode = (localStorage.getItem("isDark") === "true") || false;
    this.setDarkMode(this.darkMode)
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
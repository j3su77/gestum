import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestorum';

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    // Registrar el SVG personalizado con el nombre 'mi-svg'
    this.matIconRegistry.addSvgIcon('my-user-icon', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/user-icon.svg'));
  }
}

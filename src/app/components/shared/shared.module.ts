import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';

// ---------------Modules
import { ReactiveFormsModule }      from '@angular/forms';
import { HttpClientModule }         from '@angular/common/http';

// ---------------animations



// ---------------Material UI
import { MatSlideToggleModule }     from '@angular/material/slide-toggle';
import { MatFormFieldModule }       from '@angular/material/form-field'; 
import { MatInputModule }           from '@angular/material/input'; 
import { MatButtonModule }          from '@angular/material/button'; 
import { MatSnackBarModule }        from '@angular/material/snack-bar'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import { MatToolbarModule}          from '@angular/material/toolbar'; 
import { MatIconModule}             from '@angular/material/icon'; 
import { MatTableModule}            from '@angular/material/table'; 
import { MatSidenavModule }         from '@angular/material/sidenav'; 
import { MatListModule }            from '@angular/material/list';
import { MatTooltipModule }         from '@angular/material/tooltip';
import { MatCardModule }            from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';


 



@NgModule({
  declarations: [
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatListModule,
    MatTooltipModule,
    MatCardModule,
    MatDialogModule
  ],
  exports: [
    HttpClientModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatListModule,
    MatTooltipModule,
    MatCardModule,
    MatDialogModule
  ], 
  entryComponents: [
    ConfirmationDialogComponent
  ]

})
export class SharedModule { }

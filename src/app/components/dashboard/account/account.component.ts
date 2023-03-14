import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User, Tipo_doc } from '../../../interfaces/user';
import { LoadingService } from '../../../services/loading.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../services/error.service';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { matchValidator } from '../../../utils/match-validator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';

interface TypeDoc {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  idUser: number;
  user: User;
  formUpdateUser: FormGroup;
  formUpdatePassword: FormGroup;
  typesDocs: TypeDoc[] = [
    { value: 'CC', viewValue: 'Cédula de Ciudadanía' },
    { value: 'CE', viewValue: 'Cédula de Extranjería' },
    { value: 'PA', viewValue: 'Pasaporte' },
  ];
  hidePass: boolean = false;
  constructor(
    private _authService: AuthService,
    private fb: FormBuilder,
    private _userService: UserService,
    private _errorService: ErrorService,
    private _sanckBar: MatSnackBar,
    public _loadingService: LoadingService,
    public dialogo: MatDialog,
    private router: Router
  ) {
    this.formUpdateUser = this.fb.group({});

    this.formUpdatePassword = this.fb.group({
      current_password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      new_password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      rep_new_password: [
        '',
        [Validators.required, matchValidator('new_password')],
      ],
    });
  }

  async ngOnInit() {
    const user = await this._authService.getUserLogged();
    if(!user) {
      this.router.navigate(["/"])
      return;
    } 
    this.idUser = user!.id_usuario;
    this._loadingService.show();
    this._userService.getInfoUser(this.idUser).subscribe({
      next: async (data) => {
        this.user = data;
        this.formUpdateUser = await this.fb.group({
          nombre: [this.user.nombre, [Validators.required]],
          apellidos: [this.user.apellidos, [Validators.required]],
          tipo_documento: [this.user.tipo_documento, [Validators.required]],
          documento: [this.user.documento, [Validators.required]],
          correo: [this.user.correo, [Validators.required, Validators.email]],
          telefono: [this.user.telefono, [Validators.required]],
          // direccion: [this.user.direccion, [Validators.required]]
        });

        this._loadingService.hide();
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msgError({ e });
        this._loadingService.hide();
      },
    });
  }

  getTipoDocumentoCompleto(tipoDoc: Tipo_doc): string {
    return this._userService.getTipoDocumentoCompleto(tipoDoc);
  }

  onUpdateUser() {
    const propiedades = [
      'nombre',
      'apellidos',
      'tipo_documento',
      'documento',
      'correo',
      'telefono',
      'direccion'
    ];
    if (
      propiedades.every(
        (propiedad) =>
          this.user[propiedad] === this.formUpdateUser.value[propiedad]
      )
    ) {
      this._sanckBar.open(`Sin cambios`, 'cerrar', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 3000,
        panelClass: ['success-snackbar'],
      });
      return;
    }

    this._loadingService.show();
    console.log(this.formUpdateUser.value);
    this._userService
      .updateUser(this.idUser, this.formUpdateUser.value)
      .subscribe({
        next: (data) => {
          this.user = data;
          this._loadingService.hide();
          this._sanckBar.open(`Datos Actualizados satisfactoriamente`, '', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
        },
        error: (e: HttpErrorResponse) => {
          this._errorService.msgError({ e });
          this._loadingService.hide();
        },
      });
  }

  onUpdatePassword() {

    if(this.formUpdatePassword.value.new_password === this.formUpdatePassword.value.current_password) {
      this._errorService.msgError({ e: "Por favor, ingrese una contraseña diferente a la actual" });
      return;
    }


    this.dialogo
      .open(ConfirmationDialogComponent, {
        data: `¿Esta seguro que desea cambiar la contraseña, se cerrará la sesión actual?`,
      })
      .afterClosed()
      .subscribe((confirmed: Boolean) => {
        if (confirmed) {
          this._loadingService.show();
          this._userService
            .updatePassword(this.idUser, this.formUpdatePassword.value)
            .subscribe({
              next: (data) => {
                this._sanckBar.open(data.msg, '', {
                  horizontalPosition: 'end',
                  verticalPosition: 'top',
                  duration: 1000,
                  panelClass: ['success-snackbar'],
                });
                this._loadingService.hide();
                setTimeout(() => {
                  this._authService.logOut();
                }, 1000);
              },
              error: (e: HttpErrorResponse) => {
                this._errorService.msgError({ e });
                this._loadingService.hide();
              },
            });
        }
      });
  }
}

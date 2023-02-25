import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { HttpClientModule,  
         HTTP_INTERCEPTORS }        from '@angular/common/http';

import { AppRoutingModule }         from './app-routing.module';
import { AppComponent }             from './app.component';
import { LoginComponent }           from './components/login/login.component';
import { SharedModule }             from './components/shared/shared.module';
import { AddTokenInterceptor }      from './utils/add-token.interceptor';
import { RegisterComponent } from './components/register/register.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

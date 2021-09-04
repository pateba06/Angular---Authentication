import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthComponent } from './auth/auth/auth.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './auth/auth/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent

  ],
  imports: [
    BrowserModule,
    NgbModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

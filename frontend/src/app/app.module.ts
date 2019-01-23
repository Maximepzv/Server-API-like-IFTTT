import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { FontAwesomeModule } from 'ngx-icons';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule, Routes} from "@angular/router";
import { HomeComponent } from './home/home.component';
import {AuthenticationService} from "./api/authentification.service";
import {AlertService} from "./service/alert.service";
import {HttpClientModule} from "@angular/common/http";
import {AuthGuard} from "./guards/auth.guard";

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'signup', component: SignupComponent},
    { path: 'signin', component: SigninComponent},
];

@NgModule({
  declarations: [
      AppComponent,
      SignupComponent,
      SigninComponent,
      HomeComponent,
  ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      RouterModule.forRoot(appRoutes),
      UiModule,
      FontAwesomeModule,
      ReactiveFormsModule,
      HttpClientModule
  ],
  providers: [
    AuthenticationService,
    AlertService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

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
import { AreaComponent } from './area/area.component';
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { AppletsComponent } from './applets/applets.component';

const appRoutes: Routes = [
    {path: '', component: AreaComponent},
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'signup', component: SignupComponent},
    { path: 'signin', component: SigninComponent},
    { path: 'applets', component: AppletsComponent},
];

@NgModule({
  declarations: [
      AppComponent,
      SignupComponent,
      SigninComponent,
      HomeComponent,
      AreaComponent,
      AppletsComponent,
  ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      RouterModule.forRoot(appRoutes),
      UiModule,
      FontAwesomeModule,
      ReactiveFormsModule,
      HttpClientModule,
      MDBBootstrapModule.forRoot(),
      FormsModule
  ],
  providers: [
    AuthenticationService,
    AlertService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

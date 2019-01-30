import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { FontAwesomeModule } from 'ngx-icons';
import { SignupComponent } from './ui/signup/signup.component';
import { SigninComponent } from './ui/signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule, Routes} from "@angular/router";
import { HomeComponent } from './ui/home/home.component';
import {AuthenticationService} from "./api/authentification.service";
import {AlertService} from "./service/alert.service";
import {HttpClientModule} from "@angular/common/http";
import {AuthGuard} from "./guards/auth.guard";
import { AreaComponent } from './ui/area/area.component';
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { AppletsComponent } from './ui/applets/applets.component';
import { ContactComponent } from './ui/contact/contact.component';
import { PrivacyComponent } from './ui/privacy/privacy.component';
import { TermsofserviceComponent } from './ui/termsofservice/termsofservice.component';

const appRoutes: Routes = [
    {path: '', component: AreaComponent},
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'signup', component: SignupComponent},
    { path: 'signin', component: SigninComponent},
    { path: 'applets', component: AppletsComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'privacy', component: PrivacyComponent},
    { path: 'termsofservice', component: TermsofserviceComponent},
];

@NgModule({
  declarations: [
      AppComponent,
      SignupComponent,
      SigninComponent,
      HomeComponent,
      AreaComponent,
      AppletsComponent,
      ContactComponent,
      PrivacyComponent,
      TermsofserviceComponent,
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

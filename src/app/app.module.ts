import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RegistrationComponent} from './registration/registration.component';
import { ProjectComponent } from './project/project.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {config} from 'rxjs';

const firebaseConfig = {
  apiKey: 'AIzaSyA_sf-uY_LgmpuCR3BX4ptNgSIyZcR9WRc',
  authDomain: 'firstdemoss.firebaseapp.com',
  databaseURL: 'https://firstdemoss.firebaseio.com',
  projectId: 'firstdemoss',
  storageBucket: '',
  messagingSenderId: '498077419230',
  appId: '1:498077419230:web:d6a98d5ee5d5ee0c'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegistrationComponent,
    ProjectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  //  Firebase
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }

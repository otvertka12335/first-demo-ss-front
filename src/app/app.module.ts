import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RegistrationComponent} from './components/registration/registration.component';
import {ProjectComponent} from './components/project/project.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SnackbarModule} from 'ngx-snackbar';
import {HttpInterceptorService} from './services/http-interceptor.service';
import {CreateProjectComponent} from './modals/create-project/create-project.component';
import {OrderModule} from 'ngx-order-pipe';

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
    CreateProjectComponent,
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
    AngularFireAuthModule,
    // MATERIAL
    BrowserAnimationsModule,
    SnackbarModule.forRoot(),
    OrderModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [CreateProjectComponent]
})
export class AppModule {
}

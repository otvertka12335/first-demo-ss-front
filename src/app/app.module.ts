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
import {SnackbarModule} from 'ngx-snackbar';
import {HttpInterceptorService} from './services/http-interceptor.service';
import {CreateProjectComponent} from './modals/create-project/create-project.component';
import {OrderModule} from 'ngx-order-pipe';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularResizedEventModule} from 'angular-resize-event';
import {TeamComponent} from './modals/team/team.component';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {DevelopersComponent} from './components/developers/developers.component';
import {MaintainersComponent} from './components/maintainers/maintainers.component';
import {MaterialModule} from './material.module';
import {ToastrModule} from 'ngx-toastr';
import {TollbarComponent} from './components/tollbar/tollbar.component';
import {ConfirmComponent} from './modals/confirm/confirm.component';
import {ConnectingComponent} from './components/connecting/connecting.component';

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
    TeamComponent,
    DevelopersComponent,
    MaintainersComponent,
    TollbarComponent,
    ConfirmComponent,
    ConnectingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    OrderModule,
    FlexLayoutModule,
    AngularResizedEventModule,
    //  Firebase
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    // MATERIAL
    SnackbarModule.forRoot(),
    MaterialModule,
    NgxMatSelectSearchModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
      countDuplicates: true,
      progressBar: true,
      progressAnimation: 'decreasing',
    }) // ToastrModule added

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [CreateProjectComponent, TeamComponent, ConfirmComponent]
})
export class AppModule {
}

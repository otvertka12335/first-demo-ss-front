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
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressSpinnerModule, MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularResizedEventModule} from 'angular-resize-event';
import {TestComponent} from './components/test/test.component';
import {TeamComponent} from './modals/team/team.component';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';

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
    TestComponent,
    TeamComponent,
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
    BrowserAnimationsModule,
    SnackbarModule.forRoot(),
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatDialogModule,
    MatSelectModule,
    NgxMatSelectSearchModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [CreateProjectComponent, TeamComponent]
})
export class AppModule {
}

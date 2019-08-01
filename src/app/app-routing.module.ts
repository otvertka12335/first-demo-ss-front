import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {ProjectComponent} from './components/project/project.component';
import {AuthGuardService} from './services/auth-guard.service';
import {ConnectingComponent} from './components/connecting/connecting.component';
import {NotFoundedComponent} from './components/not-founded/not-founded.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [AuthGuardService]},
  {path: 'registration', component: RegistrationComponent, canActivate: [AuthGuardService]},
  {path: '404', component: NotFoundedComponent, canActivate: [AuthGuardService]},
  {path: '', component: DashboardComponent, canActivate: [AuthGuardService]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  {path: 'connecting', component: ConnectingComponent, canActivate: [AuthGuardService]},
  {path: 'project/:id', component: ProjectComponent, canActivate: [AuthGuardService]},
  {path: '**', redirectTo: '404', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

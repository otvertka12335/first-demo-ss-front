import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {ProjectComponent} from './components/project/project.component';
import {AuthGuardService} from './services/auth-guard.service';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: DashboardComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'project/:id', component: ProjectComponent, canActivate: [AuthGuardService]},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

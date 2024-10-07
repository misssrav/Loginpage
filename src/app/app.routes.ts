import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { SidebarComponent } from './components/sidebar/sidebar.component';

export const routes: Routes = [
   {path: '', component: LoginComponent}, 
   {path:'login', component:LoginComponent},
   {path:'signup', component:SignupComponent},
   {path:'dashboard', component:DashboardComponent, canActivate:[authGuard]},
   {path:'sidebar', component:SidebarComponent,canActivate:[authGuard]}
];

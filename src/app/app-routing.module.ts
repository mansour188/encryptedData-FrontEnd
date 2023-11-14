import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { RoleGuard } from './services/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full' // Redirect only if the path is empty (i.e., the root URL)
  },
 
  {path:"signIn",component:SignInComponent},
  {path:"home",component:HomeComponent,canActivate: [RoleGuard], data: { requiredRole: 'USER' }},
  {path:"admin",component:AdminComponent,canActivate: [RoleGuard], data: { requiredRole: 'RESPONSABLE' }},
  { path: '**', redirectTo: 'signIn' } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

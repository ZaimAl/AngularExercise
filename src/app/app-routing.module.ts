import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthOnGuard } from './auth.onGuard';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path:'',
    component: EmployeeComponent,
    canActivate:[AuthGuard],
  },
  {
    path:'login',
    component:LoginComponent,
    canActivate:[AuthOnGuard],

  },
  {
    path:'**',
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatSliderModule } from '@angular/material/slider';
// import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './pages/login/login.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


const routes: Routes = [

  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'dashboard', component: DashboardComponent, data : {title : 'Dashboard'}
  },
  {
    path: 'emp',
    loadChildren: () => import('./pages/employee/emp.module')
      .then(mod => mod.EmployeeModule),
    pathMatch: 'prefix'
  },
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  },
  // { path: '**', redirectTo: '' }
];
// export const routing: ModuleWithProviders(AppRoutingModule) = RouterModule.forRoot(routes, {
//   enableTracing: true, // <-- debugging purposes only
//   useHash: true
// });

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

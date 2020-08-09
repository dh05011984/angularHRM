import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AuthInterceptor } from './util/app-interceptor';
/* Angular material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material.module';
// import { PagesComponent } from './pages/pages.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { LoginComponent } from './shared/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
// import { EmpRegistrationComponent } from './pages/employee/emp-registration/emp-registration.component';
// import { EmployeeModule } from './pages/employee/emp.module';


@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    // PagesComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

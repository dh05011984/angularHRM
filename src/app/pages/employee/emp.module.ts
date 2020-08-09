import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularMaterialModule } from '../../material.module';
import { EmpRoutingModule } from './emp-routing.module';
import { EmpRegistrationComponent } from './emp-registration/emp-registration.component';
import { EmpProfileComponent } from './emp-profile/emp-profile.component';
import { EmpHomeComponent } from './emp-home/emp-home.component';


@NgModule({
    declarations: [EmpRegistrationComponent, EmpProfileComponent, EmpHomeComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        EmpRoutingModule
    ],
    exports: [EmpRegistrationComponent]
})
export class EmployeeModule { }

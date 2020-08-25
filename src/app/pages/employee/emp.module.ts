import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularMaterialModule } from '../../material.module';
import { EmpRoutingModule } from './emp-routing.module';
import { EmpRegistrationComponent } from './emp-registration/emp-registration.component';
import { EmpProfileComponent } from './emp-profile/emp-profile.component';
import { EmpHomeComponent } from './emp-home/emp-home.component';
import { EmpSkillsComponent } from './emp-skills/emp-skills.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StarRatingComponent } from '../../shared/star-rating/star-rating.component';
import { BankComponent } from './bank/bank.component';

@NgModule({
    declarations: [EmpRegistrationComponent, EmpProfileComponent, EmpHomeComponent, EmpSkillsComponent, StarRatingComponent, BankComponent],
    imports: [
        CommonModule,
        FlexLayoutModule,
        HttpClientModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        EmpRoutingModule
    ],
    exports: [EmpRegistrationComponent]
})
export class EmployeeModule { }

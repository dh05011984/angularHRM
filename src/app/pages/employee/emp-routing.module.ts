import { NgModule, ModuleWithProviders, ModuleWithComponentFactories } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpRegistrationComponent } from './emp-registration/emp-registration.component';
import { EmpProfileComponent } from './emp-profile/emp-profile.component';
import { EmpHomeComponent } from './emp-home/emp-home.component';


const routes: Routes = [

    {
        path: '',
        component: EmpHomeComponent,
        children: [
            { path: 'registration', component: EmpRegistrationComponent },
            { path: 'profile', component: EmpProfileComponent },
            { path: 'home', component: EmpHomeComponent },
        ]
    }

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmpRoutingModule { }

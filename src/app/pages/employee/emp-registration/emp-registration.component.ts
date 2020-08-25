import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../../../_services/login.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpService } from '../emp.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonService } from 'src/app/_services/common.service';

@Component({
  selector: 'app-emp-registration',
  templateUrl: './emp-registration.component.html',
  styleUrls: ['./emp-registration.component.scss']
})
export class EmpRegistrationComponent implements OnInit, OnDestroy {
  sub: Subscription;
  empForm: FormGroup;
  public message: string;
  public errorClass: string = 'error';

  constructor(private route: ActivatedRoute, private loginService: LoginService,
    private fb: FormBuilder, private empService: EmpService, private commonService: CommonService) { }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.commonService.closeErrorMessage();
  }
  ngOnInit(): void {
    this.sub = this.route.data.subscribe((routeData) => {
      this.loginService.pageHead.next(routeData.title);
    });
  
    this.empForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      mobile: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  onSubmit() {
    console.log(this.empForm.value);
    const { value } = this.empForm;

    if (this.empForm.valid) {
      this.empService.registerEmployee(value).subscribe((resData) => {
        console.log(resData);
        this.message = 'Employee registered successfully!';
        this.commonService.openErorMessage(this.message);
        this.errorClass = "message";
      }, (error: HttpErrorResponse) => {
        console.log(error);
        if (error.status) {
          this.message = error.error.error;
          if (error.status == 200)
            this.errorClass = "message";
          else
            this.errorClass = "error";
        } else {
          this.message = error.message;
          this.errorClass = "error";

        }
        if (this.message) {
          this.commonService.openErorMessage(this.message, 'error');
        }
      })
    }
  }
}

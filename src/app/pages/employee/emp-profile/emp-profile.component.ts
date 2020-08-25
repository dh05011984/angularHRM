import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpService } from '../emp.service';
import { CommonService } from 'src/app/_services/common.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-emp-profile',
  templateUrl: './emp-profile.component.html',
  styleUrls: ['./emp-profile.component.scss']
})
export class EmpProfileComponent implements OnInit, OnDestroy {

  sub: Subscription;
  empForm: FormGroup;
  public message: string;
  public errorClass: string = 'error';
  user: { id: number, jwt: string };

  constructor(private fb: FormBuilder, private empService: EmpService, private commonService: CommonService) { }

  ngOnInit(): void {
    //EmpId,FirstName,MidName,LastName,DOB,Gender,BloodGroup,Citizenship,MaritalStatus ,Passport ,
    //Aadhar ,UAN,PAN,SSN ,DrivingLicense ,MarriageDate,Created_by

    this.empForm = this.fb.group({
      empId: ['', Validators.required],
      firstName: ['', Validators.required],
      midName: [''],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      citizenship: ['', Validators.required],
      maritalStatus: [''],
      passport: ['', Validators.required],
      aadhar: [''],
      uan: [''],
      pan: [''],
      ssn: [''],
      drivingLicense: [''],
      marriageDate: [''],
      created_by: ['', Validators.required]
    });
    this.commonService.getLoggedInUser().subscribe((emp) => {
      this.user = emp;
    });
  }

  ngOnDestroy(): void {
    this.commonService.closeErrorMessage();
  }
  onSubmit() {
    console.log(this.empForm.value);
    const { value } = this.empForm;

    if (this.empForm.valid) {
      value.created_by = this.user.id;
      this.empService.saveProfile(value).subscribe((resData) => {
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

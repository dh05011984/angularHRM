import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpService } from '../emp.service';
import { CommonService } from 'src/app/_services/common.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {

  bankForm: FormGroup;
  public message: string;
  errorClass: string;
  routePath: string = 'empbank';
  user: { id: number, jwt: string };

  constructor(private fb: FormBuilder, private empService: EmpService, private commonService: CommonService) { }

  ngOnInit() {
    this.bankForm = this.fb.group({
      name: ['', Validators.required],
      ifsc: ['', Validators.required],
      branch: ['', Validators.required],
      account: ['', Validators.required]
    });
    this.commonService.getLoggedInUser().subscribe((emp) => {
      this.user = emp;
    });
    this.getDetail();
  }
  onSubmit() {
    const { value } = this.bankForm;
    value.empId = this.user.id;
    if (this.bankForm.valid) {
      this.empService.save(value, this.routePath).subscribe((resData) => {
        console.log(resData);
        this.message = 'Bank added successfully!';
        this.commonService.openErorMessage(this.message);
        // this.getAllSkill();
      }, (error: HttpErrorResponse) => {
        console.log(error);
        if (error.status) {
          console.log(error.error);
          this.message = error.error.error;
          if (error.status == 200)
            this.errorClass = "";
          else
            this.errorClass = "error";
        } else {
          this.message = error.message;
          this.errorClass = "error";
        }
        if (this.message) {
          this.commonService.openErorMessage(this.message, this.errorClass);
        }
      });
    }

  }

  getDetail() {
    this.empService.getDetail(this.routePath).subscribe((resData: any) => {
      console.log('val', resData);
      this.bankForm.patchValue({
        name: resData[0].name,
        ifsc: resData[0].ifsc,
        branch: resData[0].branch,
        account: resData[0].account
      });
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  delete(id: number) {
    this.empService.delete(id, this.routePath).subscribe((skill: any) => {
      // this.getAllSkill();
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }
}

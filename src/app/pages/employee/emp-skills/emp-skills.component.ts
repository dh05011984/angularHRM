import { Component, OnInit, ViewChild } from '@angular/core';
import { StarRatingColor } from '../../../_components/star-rating/star-rating.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpService } from '../emp.service';
import { CommonService } from 'src/app/_services/common.service';
import { HttpErrorResponse } from '@angular/common/http';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


export interface Skill {
  id: number;
  skill: string;
  rating: number;
}

@Component({
  selector: 'app-emp-skills',
  templateUrl: './emp-skills.component.html',
  styleUrls: ['./emp-skills.component.scss']

})
export class EmpSkillsComponent implements OnInit {
  rating: number = 3;
  starCount: number = 5;
  starColor: StarRatingColor = StarRatingColor.accent;
  starColorP: StarRatingColor = StarRatingColor.primary;
  starColorW: StarRatingColor = StarRatingColor.warn;
  rated:boolean=true;

  skillForm: FormGroup;
  public message: string;
  errorClass: string;
  user: { id: number, jwt: string };

  displayedColumns: string[] = ['skill', 'rating', 'id'];
  dataSource = new MatTableDataSource<Skill>([]);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  skills: Skill;

  constructor(private fb: FormBuilder, private empService: EmpService, private commonService: CommonService) { }

  ngOnInit() {
    this.skillForm = this.fb.group({
      skill: ['', Validators.required],
      rating: [this.rating, Validators.required]
    });
    this.commonService.getLoggedInUser().subscribe((emp) => {
      this.user = emp;
    });
    this.getAllSkill();
  }
  onSubmit() {
    console.log(this.skillForm.value);
    const { value } = this.skillForm;
    value.empId = this.user.id;
    if (this.skillForm.valid) {
      this.empService.saveSkill(value).subscribe((resData) => {
        console.log(resData);
        this.message = 'Skill added successfully!';
        this.commonService.openErorMessage(this.message);
        this.getAllSkill();
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

  onRatingChanged(rating) {
    this.rating = rating;
    this.skillForm.controls.rating.setValue(rating);
  }
  getAllSkill() {
    this.empService.getSkill().subscribe((skill: any) => {
      this.dataSource = new MatTableDataSource<Skill>(skill);
      this.dataSource.paginator = this.paginator;
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  deleteSkill(id: number) {
    this.empService.deleteSkill(id).subscribe((skill: any) => {
      // this.dataSource = new MatTableDataSource<Skill>(skill);
      // this.dataSource.paginator = this.paginator;
      this.getAllSkill();
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }
}

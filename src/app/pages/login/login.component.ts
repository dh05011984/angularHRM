import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../_services/login.service';
import { CommonService } from '../../_services/common.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  // public loginInvalid: boolean;
  public message: string;
  private formSubmitAttempt: boolean;
  private returnUrl: string;


  constructor(private fb: FormBuilder, private loginService: LoginService,
    private route: ActivatedRoute, private commonService: CommonService,
    private router: Router) { }

  ngOnDestroy(): void {
    this.commonService.closeErrorMessage();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });
    // this.form.controls.username.setValue('dhananjaysharma7@gmail.com');
    this.form.patchValue({ username: 'dhananjaysharma7@gmail.com', password: 'admin' });
  }
  onSubmit() {
    // this.loginInvalid = false;
    if (this.form.value) {
      this.loginService.userAuthentication(this.form.value.username, this.form.value.password)
        .subscribe((resData: any) => {
          console.log('dfdf', resData);
          this.loginService.isAuthenticated.next(true);
          // setting the token
          let user: { id: number, jwt: string } = { id: resData.id, jwt: resData.jwt };
          this.commonService.setLoggedInUser(user);
          this.router.navigate(['/']);

        },
          (error: HttpErrorResponse) => {
            console.log(error);
            // this.loginInvalid = true;
            if (error.status == 422 || error.status == 401) {
              this.message = error.error.error;
              // this.router.navigate(['/login']);
            } else {
              this.message = error.message;

            }
            if (this.message) {
              this.commonService.openErorMessage(this.message, 'error');
            }
          }
        )
    }
  }
}

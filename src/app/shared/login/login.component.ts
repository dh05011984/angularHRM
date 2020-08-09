import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './login.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  public loginInvalid: boolean;
  public message: string;
  private formSubmitAttempt: boolean;
  private returnUrl: string;


  constructor(private fb: FormBuilder, private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });
    // this.form.controls.username.setValue('dhananjaysharma7@gmail.com');
    this.form.patchValue({ username: 'dhananjaysharma7@gmail.com', password: 'admin' });
  }
  onSubmit() {
    this.loginInvalid = false;
    if (this.form.value) {
      this.loginService.userAuthentication(this.form.value.username, this.form.value.password)
        .subscribe((resData: any) => {
          this.loginService.isAuthenticated.next(true);
          this.router.navigate(['/']);

        },
          (error: HttpErrorResponse) => {
            console.log(error);
            this.loginInvalid = true;
            if (error.status == 422 || error.status == 401) {
              this.message = error.error.error;
              // this.router.navigate(['/login']);
            } else {
              this.message = error.message;

            }
          }
        )
    }
  }
}

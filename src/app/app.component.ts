import { Component, ViewChild, HostListener } from '@angular/core';
import { LoginService } from './shared/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'HRM App';
  isAuthenticated: boolean;
  constructor(private loginService: LoginService) {
    this.loginService.isAuthenticated.subscribe((isAuthenticated: boolean) => {
      this.isAuthenticated = isAuthenticated;
    });
  };
  ngOnInit() {
    // console.log(window.innerWidth)
  }



}
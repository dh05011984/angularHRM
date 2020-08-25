import { Component, ViewChild, HostListener, Input } from '@angular/core';
import { LoginService } from './shared/login/login.service';

enum loaderTypes {
  packman = 'packman',
  timer = 'timer',
  ballbeat = 'ball-beat',
  ballspin = 'ball-spin'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HRM App';
  loaderType: string = 'packman';


  isAuthenticated: boolean;

  constructor(private loginService: LoginService) {
    this.loginService.isAuthenticated.subscribe((isAuthenticated: boolean) => {
      this.isAuthenticated = isAuthenticated;
    });
  };
  ngOnInit() {
    this.loaderType = loaderTypes.packman;
  }



}
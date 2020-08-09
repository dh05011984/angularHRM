import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emp-home',
  templateUrl: './emp-home.component.html',
  styleUrls: ['./emp-home.component.scss']
})
export class EmpHomeComponent implements OnInit {

  links = ['home', 'registration', 'profile'];
  activeLink = this.links[0];
  constructor() { }

  ngOnInit(): void {
  }

}

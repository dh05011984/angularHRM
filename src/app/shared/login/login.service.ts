import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  serviceURL: string = 'http://localhost:8080/api/v1/';
  public isAuthenticated = new BehaviorSubject<boolean>(false);
  public pageHead = new BehaviorSubject<string>('');
  constructor(private http: HttpClient, private router: Router) { }


  userAuthentication(userName: string, password: string) {
    //   const httpOptions = {
    //     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    // };
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' })
    };
    let body = {
      email: userName,
      password: password
    };
    return this.http.post(`${this.serviceURL}login/`, body, httpOptions);

  }
  logout() {
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }
}

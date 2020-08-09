import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpService {
  serviceURL: string = 'http://localhost:8080/api/v1/';
  constructor(private http: HttpClient) { }

  registerEmployee(body: any) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    console.log('body', body);
    // let body = {
    //   email: userName,
    //   password: password
    // };
    return this.http.post(`${this.serviceURL}employee/`, body, httpOptions);
  }
}

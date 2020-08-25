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

  //#region  Employee Personal Detail

  saveProfile(body: any) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    console.log('body', body);
    return this.http.post(`${this.serviceURL}emppersonal/`, body, httpOptions);

  }

  //#endregion

  //#region Skills 

  saveSkill(body: any) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    console.log('body', body);
    return this.http.post(`${this.serviceURL}empskill/`, body, httpOptions);
  }
  getSkill() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get(`${this.serviceURL}empskill/`, httpOptions);
  }

  deleteSkill(skillId: number) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    console.log('body', skillId);
    return this.http.delete(`${this.serviceURL}empskill/${skillId}`);
  }
  //#endregion

  //#region Bank Details 

  save(body: any, routePath:string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    console.log('body', body);
    return this.http.post(`${this.serviceURL}${routePath}/`, body, httpOptions);
  }
  getDetail(routePath:string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get(`${this.serviceURL}${routePath}/`, httpOptions);
  }

  delete(skillId: number, routePath:string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    console.log('body', skillId);
    return this.http.delete(`${this.serviceURL}${routePath}/${skillId}`);
  }

  //#endregion

}

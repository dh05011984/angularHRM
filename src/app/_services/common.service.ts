import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  loggedInUser = new BehaviorSubject<{ id: number, jwt: string }>({ id: 0, jwt: '' });
  constructor(private _snackBar: MatSnackBar) { }

  openErorMessage(error: string, type?: string) {
    let options: MatSnackBarConfig = {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: ['mat-toolbar', 'mat-primary']
    };
    if (type == 'error') {
      delete options.duration;
      options.panelClass = ['mat-toolbar', 'mat-warn'];
    }
    this._snackBar.open(error, 'X', options);
  }
  closeErrorMessage() {
    this._snackBar.dismiss();
  }

  getLoggedInUser(): Observable<any> {
    return this.loggedInUser.asObservable();
  }
  setLoggedInUser(user: { id: number, jwt: string }): void {
    this.loggedInUser.next({ id: user.id, jwt: user.jwt });
  }

}

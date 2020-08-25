import { Injectable, EventEmitter } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
// import 'rxjs/operators';
import { finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppInterceptor implements HttpInterceptor {
  constructor(private spinner: NgxSpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if (!req.url.includes('Products/GETFilteredProductDetail'))  // uncomment this line when want to show loader dhananjay 1
    this.spinner.show();

    /*
    console.log(req.url);
    const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlY29tbWVyY2VDbGllbnQiLCJqdGkiOiI3M2YwYzM0My04NTc0LTRkYmQtYjYwMy04ZTlhYjBkMmMxYTAiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjAiLCJleHAiOjE1NDAyMDg0MjMsImlzcyI6ImxvY2FsaG9zdDovNDIwMCIsImF1ZCI6ImxvY2FsaG9zdDovNDIwMCJ9.0ZJct-SXd_K70wI_RSFObiqc3AkV35LGkFrF0NWXRLc';

    const headers = new HttpHeaders({
      "Authorization": `Bearer ${userToken}`,
      'Content-Type': 'application/json'
    });
    req = req.clone({ headers: req.headers.set("Authorization", `Bearer ${userToken}`) });
    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

    // const clonedReq = req.clone({ headers });
*/
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.spinner.hide(); // uncomment this line when want to show loader dhananjay 2
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          const started = Date.now();
          const elapsed = Date.now() - started;
          this.spinner.hide();
          console.log(`Request for ${req.urlWithParams} failed after ${elapsed} ms.`);
          // debugger;
        }
      }))
  }
}
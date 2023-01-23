import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrNotificationService } from 'src/app/services/toastr-notification.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(public toastr: ToastrNotificationService) { }

  handleError(err: HttpErrorResponse) {
    this.toastr.errorToaster(err.message);
  }

  httpHeaders() {
    let httpOptions = {
      headers: new HttpHeaders(),
      responseType: 'blob' as 'json'
    };
    httpOptions.headers = httpOptions.headers.append('Content-Type', 'application/json');
    return httpOptions;
  }
}

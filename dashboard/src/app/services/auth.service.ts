import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrNotificationService } from './toastr-notification.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  redirectUrl: string = '';
  public currentUserSubject = new BehaviorSubject({});
  currentUser = this.currentUserSubject.asObservable();
  constructor(
    private router: Router,
    private toastr: ToastrNotificationService,
    private http: HttpClient
  ) {}

  signUp(body: any): Observable<any> {
    const url = `${environment.baseUrl}/auth/register`;
    return this.http.post(url, body);
  }

  signIn(body: any) {
    const url = `${environment.baseUrl}/auth/login`;
    return this.http.post(url, body);
  }

  signOut() {
    localStorage.clear();
    return this.router.navigate(['/auth/login']);
  }

  get isLoggedIn() {
    let userDetail = localStorage.getItem('user');
    const user = userDetail && JSON.parse(userDetail);
    return user != null;
  }

  public getToken(): string {
    const token = localStorage.getItem('accessToken') || "";
    return token;
  }
}

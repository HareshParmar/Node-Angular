import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = true;
  loading: boolean = false;
  loginForm: FormGroup;
  checked: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(
    private formbuilder: FormBuilder,
    private title: Title,
    private router: Router,
    private authservice: AuthService,
    private commonService: CommonService
  ) {
    this.title.setTitle('Login - filmHub');
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    let navbar: any = document.querySelector('#navbarText');
    if (navbar.classList.contains('show')) {
      navbar.classList.remove('show');
    }
    this.loadForm();
  }

  loadForm() {
    this.loginForm = this.formbuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      checked: [this.checked],
    });
  }
  login() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      let value = this.loginForm.value;
      this.loading = true;
      let obj = {
        email: value.email,
        password: value.password,
      } as const;
      this.subscriptions.push(
        this.authservice.signIn(obj).subscribe({
          next: (result: any) => {
            if (result.user) {
              this.loading = false;
              localStorage.setItem('user', JSON.stringify(result.user));
              localStorage.setItem('accessToken', result.tokens.access.token);
              this.authservice.currentUserSubject.next(result.user);
              this.router.navigate(['/home']);
            }
          },
          error: (e) => {
            this.commonService.handleError(e);
            this.loading = false;
          },
        })
      );
    }
  }
  keepLoggedIn(e: any) {
    this.checked = e.target.checked;
  }
  togglePwd() {
    this.hide = !this.hide;
  }

  get formControls() {
    return this.loginForm['controls'];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}

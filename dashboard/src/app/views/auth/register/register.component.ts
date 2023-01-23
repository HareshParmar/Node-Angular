import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  loading: boolean = false;
  diffpasswords: boolean = false;
  psswd: string;
  subscriptions: Subscription[] = [];

  constructor(
    private formbuilder: FormBuilder,
    private title: Title,
    private router: Router,
    private authservice: AuthService,
    private commonService: CommonService
  ) {
    this.title.setTitle('Register - SimpleDashBoard');
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    let navbar = <HTMLElement>document.querySelector('#navbarText');
    if (navbar.classList.contains('show')) {
      navbar.classList.remove('show');
    }
    this.initialiseForm();
  }

  initialiseForm() {
    this.registerForm = this.formbuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }
  register() {
    this.registerForm.markAllAsTouched();
    let formValues = this.registerForm.value;
    if (this.registerForm && this.registerForm.valid) {
      const pwd1 = formValues.password;
      const pwd2 = formValues.confirmPassword;
      if (pwd1 === pwd2) {
        this.loading = true;
        let body = this.registerForm.value;
        delete body.confirmPassword;
        this.subscriptions.push(
          this.authservice.signUp(body).subscribe({
            next: (result) => {
              this.registerForm.reset();
              this.loading = false;
              this.router.navigate(['/auth/login']);
            },
            error: (e) => {
              this.commonService.handleError(e);
              this.loading = false;
            },
          })
        );
      } else {
        this.diffpasswords = true;
        console.log('not match');
      }
    }
  }

  clearpwdError() {
    let formValues = this.registerForm.value;
    const pwd1 = formValues.password;
    const pwd2 = formValues.confirmPassword;
    if (pwd1 === pwd2) {
      this.diffpasswords = false;
    } else {
      this.diffpasswords = true;
    }
  }

  get formControls() {
    return this.registerForm['controls'];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}

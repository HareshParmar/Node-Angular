import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [
    LoginComponent, 
    RegisterComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '', redirectTo: 'login', pathMatch: 'full'
      },
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'register', component: RegisterComponent
      }
    ])
  ]
})
export class AuthModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';


@NgModule({
  declarations: [HomeComponent, PaginationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '', component: HomeComponent, canActivate: [AuthGuard]
      }
    ])
  ]
})
export class HomeModule { }

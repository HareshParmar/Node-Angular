import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ItemComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ItemComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':id',
        component: ItemComponent,
        canActivate: [AuthGuard],
      },
    ]),
  ],
})
export class ItemModule {}

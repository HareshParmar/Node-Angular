import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedinGuard } from './guards/loggedin.guard';


const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'auth', loadChildren: ()=> import('./views/auth/auth.module').then((m)=>m.AuthModule), canActivate: [LoggedinGuard]
  },
  {
    path: 'home', loadChildren: ()=> import('./views/home/home.module').then((m)=>m.HomeModule)
  },
  {
    path: 'items', loadChildren: ()=> import('./views/item/item.module').then((m)=>m.ItemModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

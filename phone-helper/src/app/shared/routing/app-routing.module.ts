import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppNavComponent } from '../../dashboard/app-nav/app-nav.component';
import { ProfileComponent } from '../../users/profile/profile.component';

const routes: Routes = [
  { path: '**', component: AppNavComponent, children: [
    {path: '**', component: ProfileComponent}
  ]} ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

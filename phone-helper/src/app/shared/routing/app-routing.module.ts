import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "../auth.guard";

import { SignInComponent } from '../../users/sign-in/sign-in.component';
import { AppNavComponent } from '../../dashboard/app-nav/app-nav.component';
import { ProfileComponent } from '../../users/profile/profile.component';
import { WorkSpaceComponent } from 'src/app/work-space/work-space.component';
import { CampaignComponent } from 'src/app/campaign/campaign.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent},
  { path: 'home', component: AppNavComponent,  canActivate: [AuthGuard], children: [
    {path: 'profile', component: ProfileComponent},
    {path: 'workspace', component: WorkSpaceComponent},
    {path: 'campaign/:id', component: CampaignComponent },
    {path: 'campaign', component: CampaignComponent },
    {path: '**', component: ProfileComponent}
  ]} ,
  { path: '**', redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

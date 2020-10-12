import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "../guards/auth.guard";
import { AdminGuard } from "../guards/admin.guard";

import { SignInComponent } from '../../users/sign-in/sign-in.component';
import { AppNavComponent } from '../../dashboard/app-nav/app-nav.component';
import { ProfileComponent } from '../../users/profile/profile.component';
import { WorkSpaceComponent } from 'src/app/work-space/work-space.component';
import { CampaignComponent } from 'src/app/campaign/campaign.component';
import { CampaginListComponent } from 'src/app/campaign/campagin-list/campagin-list.component';
import { CustomerListComponent } from 'src/app/customers/customer-list/customer-list.component';
import { CallCenterComponent } from '../../calls/components/call-center/call-center.component'
import { LogsComponent } from 'src/app/dashboard/logs/logs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomersComponent } from 'src/app/customers/customers/customers.component';
import { UsersComponent } from 'src/app/users/users/users.component';
import { ReportsComponent } from 'src/app/dashboard/reports/reports.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent},
  { path: 'home', component: AppNavComponent,  canActivate: [AuthGuard], children: [
    {path: 'call-center', component: CallCenterComponent},
    {path: 'call-center/:id', component: CallCenterComponent},
    {path: 'logs', component: LogsComponent},
    {path: 'logs/:id', component: LogsComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'workspace', component: WorkSpaceComponent},
    {path: 'campaign/:id', component: CampaignComponent },
    {path: 'campaign', component: CampaignComponent },
    {path: 'campaign-list', component: CampaginListComponent },
    {path: 'customer/:id', component: CustomerListComponent },
    {path: 'customer', component: CustomerListComponent },
    {path: 'customers', component: CustomersComponent },
    {path: 'users', component: UsersComponent, canActivate: [AdminGuard] },
    {path: 'reports', component: ReportsComponent },
    {path: '**', component: ProfileComponent}
  ]} ,
  { path: '**', redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),BrowserAnimationsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

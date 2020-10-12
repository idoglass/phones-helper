import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';  

import { AppRoutingModule } from './shared/routing/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppNavComponent, DialogContent } from './dashboard/app-nav/app-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms' 


import { MaterialModule } from './shared/material/material.module'
import { CallsModule } from './calls/calls.module'
import { CustomersModule } from './customers/customers.module'
import { SharedModule } from './shared/shared/shared.module'

import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

import { UsersModule } from "./users/users.module"

import { WorkSpaceComponent } from './work-space/work-space.component';
import { CampaignComponent } from './campaign/campaign.component';
import { QuestionComponent } from './campaign/question/question.component';
import { ButtonsComponent, addButton } from './campaign/buttons/buttons.component';
import { CustomerListComponent, addCustomer, imports } from './customers/customer-list/customer-list.component';
import { colors } from './shared/colors';
import { LogsComponent } from './dashboard/logs/logs.component';
import { ReportsComponent } from './dashboard/reports/reports.component';
import { GraphsComponent } from './dashboard/reports/graphs/graphs.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CampaginListComponent } from './campaign/campagin-list/campagin-list.component';
import { AdminGuard } from './shared/guards/admin.guard';


@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    DialogContent,
    CustomerListComponent,
    WorkSpaceComponent,
    CampaignComponent,
    QuestionComponent,
    ButtonsComponent,
    addButton,
    addCustomer,
    imports,
    LogsComponent,
    ReportsComponent,
    GraphsComponent,
    CampaginListComponent,
  
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NoopAnimationsModule,
    LayoutModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    CommonModule,
    UsersModule,
    FormsModule,
    ReactiveFormsModule,
    CallsModule,
    CustomersModule,
    SharedModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule

  ],
  providers: [colors,AdminGuard],
  exports:[
    UsersModule,
    MaterialModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

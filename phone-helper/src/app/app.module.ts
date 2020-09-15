import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';  

import { AppRoutingModule } from './shared/routing/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppNavComponent } from './dashboard/app-nav/app-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms' 

import { MaterialModule } from './shared/material/material.module'



import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

import { UsersModule } from "./users/users.module"
import { from } from 'rxjs';
import { WorkSpaceComponent } from './work-space/work-space.component';
import { CampaignComponent } from './campaign/campaign.component';
import { QuestionComponent } from './campaign/question/question.component';
import { ButtonsComponent, addButton } from './campaign/buttons/buttons.component';


@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    CustomerListComponent,
    WorkSpaceComponent,
    CampaignComponent,
    QuestionComponent,
    ButtonsComponent,
    addButton
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    CommonModule,
    UsersModule,
    FormsModule

  ],
  providers: [],
  exports:[
    UsersModule,
    MaterialModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

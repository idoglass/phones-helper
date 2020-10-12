import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

import { MaterialModule } from '../shared/material/material.module';
import { UsersComponent, editRole } from './users/users.component'
import { SharedModule } from '../shared/shared/shared.module';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    ProfileComponent,
    RegisterComponent,
    SignInComponent,
    ForgotPasswordComponent,
    UsersComponent,
    editRole
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    FormsModule
  ], exports:[
    CommonModule,
    MaterialModule,
    FormsModule
  ]
})
export class UsersModule { }

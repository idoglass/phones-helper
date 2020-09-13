import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    ProfileComponent,
    RegisterComponent,
    SignInComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule
  ], exports:[
    CommonModule
  ]
})
export class UsersModule { }

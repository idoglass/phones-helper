import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallComponent } from './components/call/call.component';
import { CallLogComponent } from './components/call-log/call-log.component';
import { CallHelpComponent } from './components/call-help/call-help.component';
import { CallCenterComponent } from './components/call-center/call-center.component';
import { CustomerComponent } from '../customers/customer/customer.component'
import { MaterialModule } from '../shared/material/material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CallComponent, CallLogComponent, CallHelpComponent, CallCenterComponent,CustomerComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class CallsModule { }

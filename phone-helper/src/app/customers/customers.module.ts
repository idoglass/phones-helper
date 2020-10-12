import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomersComponent } from './customers/customers.component';
import { MaterialModule } from '../shared/material/material.module';
import { TableViewComponent } from '../shared/table-view/table-view.component';
import { SharedModule } from '../shared/shared/shared.module';

@NgModule({
  declarations: [CustomersComponent,],
  imports: [
    CommonModule,
    BrowserModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CustomersModule { }

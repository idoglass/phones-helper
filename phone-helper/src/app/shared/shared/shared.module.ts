import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableViewComponent, spaceByUpperCase, FetchJsonPipe } from '../table-view/table-view.component'
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
  declarations: [TableViewComponent, spaceByUpperCase, FetchJsonPipe],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    CdkTableModule
  ], 
  exports: [
    TableViewComponent
  ]
})
export class SharedModule { }

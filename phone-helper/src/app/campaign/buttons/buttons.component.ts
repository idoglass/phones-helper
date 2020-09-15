import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Button, ButtonType, Status } from '../campaign';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {

@Input()
buttons:Button[]
@Output()
newChangeEvent = new EventEmitter<boolean>();


  animal: string;
  name: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

  }
  addButton(){
    const button = new Button; 

    const dialogRef = this.dialog.open(addButton, {
      data: button
    } );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      if(result){
        if(result.type){
          this.newChangeEvent.emit(true);
      }else {
        console.log(result)
        this.buttons.push({...result})
        this.newChangeEvent.emit(true);
      }
    }
    });
  }

  editButton(button:Button){
    const dialogRef = this.dialog.open(addButton, {
      data: button
    } );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',{...result});
      if(result){
        if(result.type){
        this.buttons.forEach( (item, index) => {
          if(item === result.button) this.buttons.splice(index,1);
        });
        this.newChangeEvent.emit(true);
      }else {
        console.log(result)
        this.newChangeEvent.emit(true);
      }
    }
    });
  }
  
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'addbuttons.companent.html',
  styleUrls: ['./buttons.component.css']
})

   
      
export class addButton {
  type = ButtonType;
  buttonTypes = [];

  status = Status;
  statuses = [];

  constructor(
    public dialogRef: MatDialogRef<addButton>,
    @Inject(MAT_DIALOG_DATA) public data: Button) {
      this.buttonTypes=Object.values(this.type);
      this.statuses=Object.values(this.status);
      console.log(this.buttonTypes)
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

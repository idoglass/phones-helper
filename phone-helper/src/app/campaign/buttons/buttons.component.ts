import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Button, ButtonType, Campaign, Status } from '../campaign';

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
@Input()
campaign:Campaign
@Output()
newChangeEvent = new EventEmitter<boolean>();


  animal: string;
  name: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.campaign)
  }
  addButton(){
    const button = new Button; 

    const dialogRef = this.dialog.open(addButton, {
      data: {button: button, statuses:this.campaign.statusObjList}
    } );

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(result.type === 'remove'){
          this.newChangeEvent.emit(true);
      }else {
        this.buttons.push({...result})
        this.newChangeEvent.emit(true);
      }
    }
    });
  }

  editButton(button:Button){
    const dialogRef = this.dialog.open(addButton, {
      data: {button: button, statuses:this.campaign.statusObjList}
    } );

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(result.type  === 'remove'){
        this.buttons.forEach( (item, index) => {
          if(item === result.button) this.buttons.splice(index,1);
        });
        this.newChangeEvent.emit(true);
      }else {
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


  options:string[] = [
    'yellowgreen','yellow','whitesmoke','white','wheat','violet','turquoise','tomato','thistle','teal','tan','steelblue','springgreen','snow','slategrey','slategray','slateblue','skyblue','silver','sienna','seashell','seagreen','sandybrown','salmon','saddlebrown','royalblue','rosybrown','red','purple','powderblue','plum','pink','peru','peachpuff','papayawhip','palevioletred','paleturquoise','palegreen','palegoldenrod','orchid','orangered','olivedrab','olive','oldlace','navy','navajowhite','moccasin','mistyrose','mintcream','midnightblue','mediumvioletred','mediumturquoise','mediumspringgreen','mediumslateblue','mediumseagreen','mediumpurple','mediumorchid','mediumblue','mediumaquamarine','maroon','magenta','linen','limegreen','lime','lightyellow','lightsteelblue','lightslategrey','lightslategray','lightskyblue','lightseagreen','lightsalmon','lightpink','lightgrey','lightgreen','lightgray','lightgoldenrodyellow','lightcyan','lightcoral','lightblue','lemonchiffon','lawngreen','lavenderblush','lavender','khaki','ivory','indigo','indianred','hotpink','honeydew','grey','greenyellow','green','gray','goldenrod','gold','ghostwhite','gainsboro','fuchsia','forestgreen','floralwhite','firebrick','dodgerblue','dimgrey','dimgray','deepskyblue','deeppink','darkviolet','darkturquoise','darkslategrey','darkslategray','darkslateblue','darkseagreen','darksalmon','darkred','darkorchid','darkorange','darkolivegreen','darkmagenta','darkkhaki','darkgrey','darkgreen','darkgray','darkgoldenrod','darkcyan','darkblue','cyan','crimson','cornsilk','cornflowerblue','coral','chocolate','chartreuse','cadetblue','burlywood','brown','blueviolet','blue','blanchedalmond','black','bisque','beige','azure','aquamarine','aqua','azure'
  ]
  constructor(
    public dialogRef: MatDialogRef<addButton>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.buttonTypes=Object.values(this.type);
      console.log(data)
      data.statuses.forEach(element => {
        this.statuses.push(element.name)
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

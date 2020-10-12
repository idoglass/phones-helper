import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Campaign } from 'src/app/campaign/campaign';
import { CampaignService } from 'src/app/campaign/campaign.service';
import { User } from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users:User[]
  user:User
  campaigns:Campaign[]
  
    constructor(
      private campaignService:CampaignService,
       private userService:UsersService,
       public router: Router,
       public dialog: MatDialog,
       ) { }
  
  
    ngOnInit(): void {
      this.getUser()
    }
  
    getUser(){
      this.userService.getFullUserDetails().subscribe(user => {
        this.user =  {id:user.payload.id, ...user.payload.data()}as User
        this.getUsers(this.user.workSpace)
        this.getCampaigns(this.user.workSpace)
      })
    }
  
    getUsers(workspaceID:string){
      this.userService.getUsers(workspaceID).subscribe(data => {
        this.users = data.map(e => {
          const object = e.payload.doc.data()
          return {
            id: e.payload.doc.id,
            ...object
          } as User ;
        });
  
      } )
    }
    changeCampaign(campaignID:string){
      console.log(this.user.workSpace,campaignID)
      this.getUsers(this.user.workSpace)
    }
    getCampaigns(workSpace) {
      // we call getRecipes() from RecipeService to get list of employees
      this.campaignService.getCampaigns(workSpace).subscribe(data => {
        this.campaigns = data.map(e => {
          const object = e.payload.doc.data()
          return {
            id: e.payload.doc.id,
            ...object
          } as Campaign ;
        });
      });
    }

    buttonClicked(event){
      let user = event.item as User
      switch(event.button) {
        case 'admin_panel_settings':
          this.openDialog(user)
          break;
        case 'delete':
          user.workSpace = "no-workspace"
          this.userService.updateUser(user)
          break;
          case 'chat':
            console.log(event)
            this.router.navigate(['/home/logs',  event.item.id ]);
            break;
        default:
          // code block
      }
    }

    openDialog(customer): void {
      const dialogRef = this.dialog.open(editRole, {
        width: '400px',
        data: customer
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed',result);
        if(result){this.userService.updateUser(result)}
      });
    }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'editRole.companent.html',
})
export class editRole {

  constructor(
    public dialogRef: MatDialogRef<editRole>,
    @Inject(MAT_DIALOG_DATA) public data: User) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
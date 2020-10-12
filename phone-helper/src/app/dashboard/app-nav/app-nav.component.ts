import { Component, OnInit, Inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
import { User, WorkSpace } from 'src/app/users/user';
import { UsersService } from 'src/app/users/users.service';
import { CampaignService } from 'src/app/campaign/campaign.service';
import { Campaign } from 'src/app/campaign/campaign';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/campaign/buttons/buttons.component';
import { SafeResourceUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.css']
})
export class AppNavComponent implements OnInit{
  user:User
  campaigns:Campaign[] = []
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  openNav:boolean =true
  workspace:WorkSpace
  campaignTitle:string
  
  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    public userService: UsersService,
    public campaignService:CampaignService,
    public router: Router,
    public dialog: MatDialog
    ) {}

    ngOnInit() { 
      this.getUser()
     }
  
     getUser():User {
      // we call getRecipes() from RecipeService to get list of employees
     
      return this.userService.getFullUserDetails().subscribe(data => {
        this.user =  {id:data.payload.id, ...data.payload.data()} as User  
        this.getCampaigns(this.user.workSpace)
        this.getWorkspace()
        } )
        }
        
        getCampaigns(workSpace) {
          // we call getRecipes() from RecipeService to get list of employees
          this.campaignService.getCampaigns(workSpace).subscribe(data => {
            this.campaigns = data.map(e => {
              const object = e.payload.doc.data()
              if(object.id == this.user.campaign){this.campaignTitle=object.title}
              return {
                id: e.payload.doc.id,
                ...object
              } as Campaign ;
            });
            
          });
        }

        getWorkspace(){
          this.userService.getWorkSpace(this.user.workSpace).subscribe(data => {
            this.workspace = {id: data.payload.id,...data.payload.data()} as WorkSpace
          })
        }

        openSetWorkspaceDialog() {
          const dialogRef = this.dialog.open(DialogContent, {
            width: '300px',
            data: this.user.workSpace
          });

          dialogRef.afterClosed().subscribe(result => {
            if(result) {
              this.user.workSpace = result
              this.userService.updateUser(this.user)
            } result;
          });
        }
        setCurrentCampaign(campaignID:string){
        this.user.campaign = campaignID
              this.userService.updateUser(this.user)
        }

}

@Component({
  selector: 'dialog-content-example-dialog',
  template: '<h1 mat-dialog-title>set workspace</h1>' +
  '<mat-form-field appearance="outline"> <input [type]="hide ? password : text"  matInput [(ngModel)]="data" >'+
  '<mat-icon matSuffix (click)="toggleHide()" style="cursor: pointer;">{{visibility}}</mat-icon></mat-form-field>' +
  '<div mat-dialog-actions>  <button mat-button (click)="onNoClick()">cancel</button>  <button mat-raised-button color="primary" [mat-dialog-close]="data" cdkFocusInitial>set</button></div>',
})
export class DialogContent {
  hide:boolean = true
  password = "password"
  text = "text"
  visibility ="visibility"
  constructor(
    public dialogRef: MatDialogRef<DialogContent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  toggleHide(){
    this.hide = !this.hide
    if(this.hide){this.visibility = "visibility"}
    else {this.visibility = "visibility_off"}
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { callItem } from 'src/app/calls/call';
import { Campaign } from 'src/app/campaign/campaign';
import { CampaignService } from 'src/app/campaign/campaign.service';
import { User } from 'src/app/users/user';
import { UsersService } from 'src/app/users/users.service';
import { CallsService } from '../../calls/calls.service'
@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
logs:callItem[]
user:User
campaigns:Campaign[]
userID:string
  constructor(private callService:CallsService,
    public campaignService:CampaignService,
     private userService:UsersService,
     private route: ActivatedRoute,) { }


  ngOnInit(): void {
    this.getUser()
    this.userID = this.route.snapshot.paramMap.get('id')
  }

  getUser(){
    this.userService.getFullUserDetails().subscribe(user => {
      this.user =  {id:user.payload.id, ...user.payload.data()}as User
      this.getLogs(this.user.workSpace,this.user.campaign,this.userID)
      this.getCampaigns(this.user.workSpace)
    })
  }

  getLogs(workspaceID:string,campaignID:string,userID?:string){
    if(userID){
      this.callService.getUserItems(workspaceID,campaignID,userID).subscribe(data => {
        this.logs = data.map(e => {
          const object = e.payload.doc.data()
          return {
            id: e.payload.doc.id,
            ...object
          } as callItem ;
        });
  
      } )
    } else {
      this.callService.getAllItems(workspaceID,campaignID).subscribe(data => {
        this.logs = data.map(e => {
          const object = e.payload.doc.data()
          return {
            id: e.payload.doc.id,
            ...object
          } as callItem ;
        });
  
      } )
    }
   
  }
  changeCampaign(campaignID:string){
    console.log(this.user.workSpace,campaignID)
    this.getLogs(this.user.workSpace,campaignID)
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

}


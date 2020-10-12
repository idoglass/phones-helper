import { Component, OnInit } from '@angular/core';
import { User, user,WorkSpace } from '../users/user';
import { UsersService } from '../users/users.service';
import { Campaign } from '../campaign/campaign';
import { CampaignService } from '../campaign/campaign.service'
import { AuthService } from '../shared/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-work-space',
  templateUrl: './work-space.component.html',
  styleUrls: ['./work-space.component.css']
})
export class WorkSpaceComponent implements OnInit {
fullUser:User
user:User
workspace: WorkSpace
campaigns:Campaign[]
campaign:Campaign
changeWorkspace:boolean

  constructor(public userService: UsersService,public campaignService:CampaignService, private auth:AuthService ) {  
    
  }

  ngOnInit(): void {
    
    
   this.fullUser = new user
   this.auth.user$.subscribe(user => {this.fullUser = user; this.setWorkSpace(this.fullUser.workSpace)})
   this.workspace = new WorkSpace
   
  }
 

  setWorkSpace(password:string):WorkSpace{
    return this.userService.getWorkSpace(password).subscribe(data => {
      this.workspace =  {id:data.payload.id, ...data.payload.data()} as WorkSpace
      this.getCampaigns(this.workspace)
      this.getCurrentCampaign()
      if (this.workspace.title){
        this.fullUser.workSpace = this.workspace.id
      } else {
        this.fullUser.workSpace = "no-workspace"
      }
      this.userService.updateUser(this.fullUser)
    })
  }

  getCampaigns(workSpace) {
    // we call getRecipes() from RecipeService to get list of employees
    this.campaignService.getCampaigns(workSpace.id).subscribe(data => {
      this.campaigns = data.map(e => {
        const object = e.payload.doc.data()
        return {
          id: e.payload.doc.id,
          ...object
        } as Campaign ;
      });
    });
  }
  getCurrentCampaign(){
    this.campaignService.getCampaign(this.fullUser.campaign,this.workspace.id).subscribe(data => {
      this.campaign =  {id:data.payload.id, ...data.payload.data()} as Campaign 
    })
  }

  setCurrentCampaign(campaignID:string){
    this.fullUser.campaign = campaignID
          this.userService.updateUser(this.fullUser)
    }

    unActiveCampaign(campaign:Campaign){
      campaign.isActive = false
      this.campaignService.updateCampaign(campaign,this.workspace.id)
    }

    deleteCampaign(campaign:Campaign){
      console.log("delete")
      this.campaignService.deleteCampaign(campaign.id,this.workspace.id)
    }
}

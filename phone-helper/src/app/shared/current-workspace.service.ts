import { Injectable } from '@angular/core';
import { User } from 'firebase';
import { UsersService } from '../users/users.service';
import { WorkSpace } from '../users/user';
import { CampaignService } from '../campaign/campaign.service';
import { Campaign } from '../campaign/campaign';

@Injectable({
  providedIn: 'root'
})
export class CurrentWorkspaceService {
  user
  workspace: WorkSpace;
  workSpaceID:string
  campaignID: string;
  campaign: Campaign;
  constructor(private usersService:UsersService,
    private campaignService:CampaignService,
    
    ) { }

  async getCurrentWorkspace(){
    await this.getUser()
    await this.setWorkSpace(this.user.workSpace)
  }

  getUser():User {
    // we call getRecipes() from RecipeService to get list of employees
    return this.usersService.getFullUserDetails().subscribe(data => {
      this.user =  {uid:data.payload.id, ...data.payload.data()} as User 
      this.setWorkSpace(this.user.workSpace)
    })
  }  

  setWorkSpace(password:string):WorkSpace{
    return this.usersService.getWorkSpace(password).subscribe(data => {
      this.workspace =  {id:data.payload.id, ...data.payload.data()} as WorkSpace
        this.getCampaign(this.campaignID)
    })
  }
  getCampaign(campaignID:string):Campaign {
    // we call getRecipes() from RecipeService to get list of employees
    return this.campaignService.getCampaign(campaignID,this.workspace.id).subscribe(data => {
      this.campaign =  {id:data.payload.id, ...data.payload.data()} as Campaign 
      console.log(this.campaign)
    })
  } 


}

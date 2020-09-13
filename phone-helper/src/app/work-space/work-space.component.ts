import { Component, OnInit } from '@angular/core';
import { User, user,WorkSpace } from '../users/user';
import { UsersService } from '../users/users.service';
import { Campaign } from '../campaign/campaign';
import { CampaignService } from '../campaign/campaign.service'

@Component({
  selector: 'app-work-space',
  templateUrl: './work-space.component.html',
  styleUrls: ['./work-space.component.css']
})
export class WorkSpaceComponent implements OnInit {
fullUser:User
workspace: WorkSpace
campaigns:Campaign[]

  constructor(public userService: UsersService,public campaignService:CampaignService ) {  
    this.getUser()
    
  }

  ngOnInit(): void {
   this.fullUser = new user
   this.workspace = new WorkSpace
   
  }
  getUser():User {
    // we call getRecipes() from RecipeService to get list of employees
    return this.userService.getFullUserDetails().subscribe(data => {
      this.fullUser =  {uid:data.payload.id, ...data.payload.data()} as User 
      this.setWorkSpace(this.fullUser.workSpace)
    })
  }  

  setWorkSpace(password:string):WorkSpace{
    return this.userService.getWorkSpace(password).subscribe(data => {
      this.workspace =  {id:data.payload.id, ...data.payload.data()} as WorkSpace
      this.getCampaigns(this.workspace)
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

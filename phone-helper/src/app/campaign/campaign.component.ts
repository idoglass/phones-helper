import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../campaign/campaign.service'
import { UsersService } from '../users/users.service'
import { User, user, WorkSpace } from '../users/user';
import { Campaign, Question } from './campaign';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {
user:User
campaign:Campaign
workspace:WorkSpace
questions:Question[]
campaignID:string

  constructor(
    private campaignService:CampaignService,
    public usersService:UsersService,
    private route: ActivatedRoute,
    ) {
    this.user = new user
    this.campaign = new Campaign
    this.getUser()
    
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
        
        this.campaignID = this.route.snapshot.paramMap.get('id');
        if(this.campaignID){
          this.getCampaign(this.campaignID)
        }
      })
    }
    getCampaign(campaignID:string):Campaign {
      // we call getRecipes() from RecipeService to get list of employees
      return this.campaignService.getCampaign(campaignID,this.workspace.id).subscribe(data => {
        this.campaign =  {id:data.payload.id, ...data.payload.data()} as Campaign 
        console.log(this.campaign)
        this.getQuestions()
      })
    }  
  ngOnInit(): void {
  }

  getQuestions() {
    // we call getRecipes() from RecipeService to get list of employees
    this.campaignService.getQustions(this.workspace,this.campaignID).subscribe(data => {
      this.questions = data.map(e => {
        const object = e.payload.doc.data()
        return {
          id: e.payload.doc.id,
          ...object
        } as Question ;
      });
      console.log(this.questions)
    });
  }

  addCampaign(campaign:Campaign){
    this.campaignService.addCampaign(campaign, this.workspace.id).then(data => {
      this.campaign.id = data
      this.campaignID = data
    })
  }

  updateCampaign(campaign:Campaign){
    this.campaignService.updateCampaign(campaign, this.workspace.id)
  }
}

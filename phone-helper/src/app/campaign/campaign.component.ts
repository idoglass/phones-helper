import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../campaign/campaign.service'
import { UsersService } from '../users/users.service'
import { User, user, WorkSpace } from '../users/user';
import { Campaign, CustomerStatus, Question } from './campaign';
import { ActivatedRoute } from '@angular/router';
import { colors } from '../shared/colors'
import { AuthService } from '../shared/auth.service';


@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {
user:User
campaign:Campaign

workspace:WorkSpace
questions:Question[] = []
campaignID:string

changes:boolean
savedQuestions:Question[] = []
newQuestions:Question[] = []

  constructor(
    private campaignService:CampaignService,
    public usersService:UsersService,
    private route: ActivatedRoute,
    private auth:AuthService,
    private colors:colors,
    ) {
    this.user = new user
    this.campaign = new Campaign()
    
    this.auth.user$.subscribe(user => {
      console.log("start")
      this.user = user;
      console.log("user")
      this.setWorkSpace(this.user.workSpace)
      console.log("setWorkSpace")
      this.campaignID = this.route.snapshot.paramMap.get('id');
        if(this.campaignID){
          this.getCampaign(this.campaignID)
          console.log("getCampaign")
        }
      })
   }

 

    setWorkSpace(password:string):WorkSpace{
      return this.usersService.getWorkSpace(password).subscribe(data => {
        this.workspace =  {id:data.payload.id, ...data.payload.data()} as WorkSpace
      })
    }

    getCampaign(campaignID:string):Campaign {
      // we call getRecipes() from RecipeService to get list of employees
      return this.campaignService.getCampaign(campaignID,this.user.workSpace).subscribe(data => {
        this.campaign =  {id:data.payload.id, ...data.payload.data()} as Campaign 
        this.getQuestions()
      })
    }  
  ngOnInit(): void {
  
  }

  getQuestions() {
    // we call getRecipes() from RecipeService to get list of employees
    this.campaignService.getQustions(this.user.workSpace,this.campaignID).subscribe(data => {
      this.savedQuestions = data.map(e => {
        const object = e.payload.doc.data()
        return {
          id: e.payload.doc.id,
          ...object
        } as Question ;
      });
      if(this.savedQuestions){this.removeDupicantsQuestions()}
      
    });
  }
  removeDupicantsQuestions(){
    this.savedQuestions.forEach(savedQuestion => {
      for (var i =0; i < this.newQuestions.length; i++)
        if (this.newQuestions[i].index == savedQuestion.index) {
          this.newQuestions.splice(i,1);
          console.log("found doup")
          break;
          } else {
            console.log("not found")
          }
      })
      this.questions = [...this.savedQuestions , ...this.newQuestions]
  }

  addCampaign(campaign:Campaign){
    console.log(campaign)
    this.campaignService.addCampaign(campaign, this.user.workSpace).then(data => {
      this.campaign.id = data
      this.campaignID = data
      this.addFirstQuestion()
    })
  }

  updateCampaign(campaign:Campaign){
    this.campaignService.updateCampaign(campaign, this.user.workSpace)
    this.changes = false
  }

  addQuestion(){
    if(!this.questions){this.addFirstQuestion()}
    const index = this.questions.length
    this.newQuestions.push(new Question(index+1))
    this.removeDupicantsQuestions()
    console.log(this.newQuestions)
    console.log(this.questions)
  }
  addFirstQuestion(){
    const index = 1
    this.newQuestions = []
    this.newQuestions.push(new Question)
    this.newQuestions[0].index = index 

  }

  addstatus(){
    this.campaign.statusObjList.push({name:'',isClosed:false})
  }

  deleteStatus(Status:CustomerStatus){
    this.campaign.statusObjList = this.campaign.statusObjList.filter(item => item !== Status);
  }

  ischanges(){
    this.changes = true
  }

  
}


import { Component, OnInit, Input } from '@angular/core';
import { Campaign, Question } from '../campaign';
import { WorkSpace } from 'src/app/users/user';
import { CampaignService } from '../campaign.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
@Input()
qusetion:Question
@Input()
workspace:string
@Input()
campaignID:string

title:string
changes:boolean

  constructor(public campaignService:CampaignService) { }

  ngOnInit(): void {
    console.log(this.qusetion)
    if (this.qusetion.id){
      this.title = "edit"
      this.changes = false
    } else {
      this.title = "create"
      this.changes = true
    }

  }

  updateQuestion(question:Question){
    console.log(question)
    this.campaignService.updateQuestion(question,this.workspace,this.campaignID)
    this.changes = false
  }
  deleteQuestion(question){
    this.campaignService.deleteQuestion(question,this.workspace,this.campaignID)
  }

  addQuestion(question){
    this.campaignService.addQustion(question,this.workspace,this.campaignID).then(data => {
      this.qusetion.id = data
      this.changes = false
    })
  }

  setChanges(event?:boolean){

    this.changes = true
    console.log(this.changes,"change?",event)
  }
}

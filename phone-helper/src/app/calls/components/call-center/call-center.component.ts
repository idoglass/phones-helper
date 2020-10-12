import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/users/user';
import { CostumersService } from 'src/app/customers/costumers.service';
import { UsersService } from 'src/app/users/users.service';
import { Customer } from 'src/app/customers/customer';
import { Campaign, Question } from 'src/app/campaign/campaign';
import { CampaignService } from 'src/app/campaign/campaign.service';
import { async } from 'rxjs/internal/scheduler/async';
import { callItem, CallItem, Massage } from '../../call';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-call-center',
  templateUrl: './call-center.component.html',
  styleUrls: ['./call-center.component.css']
})
export class CallCenterComponent implements OnInit {
toggleLog:boolean
toggleHelp:boolean
toggleCustomer:boolean
  user: User;
  customer: Customer;
  campaign: Campaign;
  questions: Question[];
  customerID: string
logs:callItem[]
constructor(
  private customerService:CostumersService,
  private userService:UsersService,
  private campaignService:CampaignService,
  private route: ActivatedRoute,
  ) { 

  this.campaign = new Campaign;
this.getUser()
this.customerID = this.route.snapshot.paramMap.get('id')

}

  getUser():User {
    // we call getRecipes() from RecipeService to get list of employees
   
    return this.userService.getFullUserDetails().subscribe(data => {
      this.user =  {id:data.payload.id, ...data.payload.data()} as User  
      this.getCampaign()
      if(this.customerID){this.getCustomer()}
      } )
    }  

    getCustomer():Customer{
      return this.customerService.getCustomer(this.user.campaign,this.user.workSpace,this.customerID).subscribe(data => {
        this.customer =  {id:data.payload.id, ...data.payload.data()} as Customer 

      })
    }

    getRandCustomer() {
      this.customerService.getRandomCustomer(this.user.campaign,this.user.workSpace).subscribe(data => {
        let i = 0 
        data.map(e => {
          if (i==0){
            this.customer =  {id:e.payload.doc.id, ...e.payload.doc.data()} as Customer
            i++
            } 
        })   
      })    
    }

    getCampaign():Campaign {
      // we call getRecipes() from RecipeService to get list of employees
      return this.campaignService.getCampaign(this.user.campaign,this.user.workSpace).subscribe(data => {

        this.campaign =  {id:data.payload.id, ...data.payload.data()} as Campaign 
        this.getQuestions()
      })
    }  
  ngOnInit(): void {
  }

  getQuestions() {
    // we call getRecipes() from RecipeService to get list of employees
    this.campaignService.getQustions(this.user.workSpace,this.user.campaign).subscribe(data => {
      this.questions = data.map(e => {
        const object = e.payload.doc.data()
        return {
          id: e.payload.doc.id,
          ...object
        } as Question ;
      });
    });
  }

  toggle(item) {
    switch (item) {
      case "help" :
        this.toggleHelp = ! this.toggleHelp
        break;
      case "log":
        this.toggleLog = !this.toggleLog
        break;
      case "customer":
        this.toggleCustomer = !this.toggleCustomer  
        break;
    } 
  }
  sendLog(logs:callItem[]){
    this.logs = [...logs]
  
  }
}
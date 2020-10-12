import { Component, OnInit } from '@angular/core';
import { Campaign } from 'src/app/campaign/campaign';
import { CampaignService } from 'src/app/campaign/campaign.service';
import { CostumersService } from 'src/app/customers/costumers.service';
import { Customer } from 'src/app/customers/customer';
import { User } from 'src/app/users/user';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
user:User
campaigns:Campaign[]
campaignMeta:[{campaignID:string,customerNum:number}] 
  constructor(
  private customerService:CostumersService,
  private userService:UsersService,
  private campaignService:CampaignService,
  ) { }

  ngOnInit(): void {
  this.getUser()
  
  }

  getUser():User {
    // we call getRecipes() from RecipeService to get list of employees
   
    return this.userService.getFullUserDetails().subscribe(data => {
      this.user =  {id:data.payload.id, ...data.payload.data()} as User  
      this.getCampaigns(this.user.workSpace)
      } )
      }

      getCampaigns(workSpace) {
        // we call getRecipes() from RecipeService to get list of employees
        this.campaignService.getCampaigns(workSpace).subscribe(data => {
          this.campaigns = data.map(e => {
            const object = e.payload.doc.data()
            this.getCustomers(e.payload.doc.id)
            return {
              id: e.payload.doc.id,
              ...object
            } as Campaign ;
          });
          
        });
      }

      getCustomers(campaignID:string){
        this.customerService.getCustomers(campaignID,this.user.workSpace).subscribe(data => {
          if( this.campaignMeta){this.campaignMeta.push({campaignID:campaignID,customerNum:data.length})}
          else this.campaignMeta = [{campaignID:campaignID,customerNum:data.length}]
        })
        console.log(this.campaignMeta)
      }

}

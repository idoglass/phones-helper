import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/users/user';
import { UsersService } from 'src/app/users/users.service';
import { Campaign } from '../campaign';
import { CampaignService } from '../campaign.service';

@Component({
  selector: 'app-campagin-list',
  templateUrl: './campagin-list.component.html',
  styleUrls: ['./campagin-list.component.css']
})
export class CampaginListComponent implements OnInit {
  user:User
  campaigns:Campaign[]

    constructor(
      public campaignService:CampaignService,
       private userService:UsersService,
       private router: Router,) { }
  
  
    ngOnInit(): void {
      this.getUser()
    }
  
    getUser(){
      this.userService.getFullUserDetails().subscribe(user => {
        this.user =  {id:user.payload.id, ...user.payload.data()}as User
        this.getCampaigns(this.user.workSpace)
      })
    }
  


    getCampaigns(workSpace) {
      // we call getRecipes() from RecipeService to get list of employees
      this.campaignService.getAllCampaigns(workSpace).subscribe(data => {
        this.campaigns = data.map(e => {
          const object = e.payload.doc.data()
          return {
            id: e.payload.doc.id,
            ...object
          } as Campaign ;
        });
      });
    }

    buttonClicked(event){
      switch(event.button) {
        case 'edit':
          this.router.navigate(['/home/campaign',  event.item.id ]);
          break;
        case 'delete':
          console.log(event)
          this.deleteCampaign(event.item)
          break;
          case 'phone':
            console.log(event)
            
            break;
        default:
          // code block
      }
    }

    deleteCampaign(campaign:Campaign){
      console.log("delete")
      this.campaignService.deleteCampaign(campaign.id,this.user.workSpace)
    }
  
}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router} from '@angular/router';
import { CallsService } from 'src/app/calls/calls.service';
import { DialogData } from 'src/app/campaign/buttons/buttons.component';
import { Campaign } from 'src/app/campaign/campaign';
import { CampaignService } from 'src/app/campaign/campaign.service';
import { User } from 'src/app/users/user';
import { UsersService } from 'src/app/users/users.service';
import { CostumersService } from '../costumers.service';
import { Customer } from '../customer';
import { addCustomer } from '../customer-list/customer-list.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers:Customer[]
  user:User
  campaigns:Campaign[]

  
    constructor(private customersService:CostumersService,
      public campaignService:CampaignService,
       private userService:UsersService,
       public dialog: MatDialog,
       public router: Router
       ) { }
  
  
    ngOnInit(): void {
      this.getUser()
    }
  
    getUser(){
      this.userService.getFullUserDetails().subscribe(user => {
        this.user =  {id:user.payload.id, ...user.payload.data()}as User
        this.getCustomers(this.user.workSpace,this.user.campaign)
        this.getCampaigns(this.user.workSpace)
      })
    }
  
    getCustomers(workspaceID:string,campaignID:string){
      this.customersService.getCustomers(campaignID,workspaceID).subscribe(data => {
        this.customers = data.map(e => {
          const object = e.payload.doc.data()
          return {
            id: e.payload.doc.id,
            ...object
          } as Customer ;
        });
  
      } )
    }
    changeCampaign(campaignID:string){
      console.log(this.user.workSpace,campaignID)
      this.getCustomers(this.user.workSpace,campaignID)
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

    buttonClicked(event){
      switch(event.button) {
        case 'edit':
          this.editCustomer(event.item)
          break;
        case 'delete':
          console.log(event)
          this.deleteCustomer(event.item)
          break;
          case 'phone':
            console.log(event)
            this.router.navigate(['/home/call-center',  event.item.id ]);
            break;
        default:
          // code block
      }
    }
    deleteCustomer(customer:Customer){
      this.customersService.deleteCustomer(this.user.campaign,this.user.workSpace,customer.id)
    }
    editCustomer(customer:Customer){
      this.openDialog(customer)
      console.log(customer)
    }

    openDialog(customer): void {
      const dialogRef = this.dialog.open(addCustomer, {
        width: '400px',
        data: customer
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed',result);
        if(result){this.customersService.updateCustomer(this.user.campaign,this.user.workSpace,result)}
      });
    }

}


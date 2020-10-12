import { Component, OnInit, Input, Inject } from '@angular/core';
import { User, WorkSpace, user } from 'src/app/users/user';
import { Campaign } from 'src/app/campaign/campaign';
import { Customer, Gender } from '../customer'
import { CampaignService } from 'src/app/campaign/campaign.service';
import { UsersService } from 'src/app/users/users.service';
import { ActivatedRoute } from '@angular/router';
import { CostumersService } from '../costumers.service'
import { Status } from '../../campaign/campaign';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  user:User
  campaign:Campaign
  workspace:WorkSpace
  customers:Customer[]
  @Input()
  campaignID:string
  changes:boolean
  import_export:boolean = true
  isDouble:boolean = false
  duplicants:Customer[] =[]
  showDouble:boolean = false
  selected = []


  constructor(
    private campaignService:CampaignService,
    public usersService:UsersService,
    private route: ActivatedRoute,
    private customersService:CostumersService,
    public dialog: MatDialog
    ) {
    this.user = new user
    this.campaign = new Campaign
    this.getUser()
    
   }
   setSelected(d){
     this.selected = d
}
deleteDupCustomer(){
  this.selected.forEach(customer => {
    this.customersService.deleteCustomer(this.campaignID,this.workspace.id,customer.value.id)
  })
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
          if(this.campaignID){
        this.getCampaign(this.campaignID)
      }
    })
  }
  getCampaign(campaignID:string):Campaign {
    // we call getRecipes() from RecipeService to get list of employees
    return this.campaignService.getCampaign(campaignID,this.workspace.id).subscribe(data => {
      this.campaign =  {id:data.payload.id, ...data.payload.data()} as Campaign 
      this.getCustomers(this.workspace,this.campaignID)
    })
  }  

  ngOnInit(): void {

  }

  getCustomers(workSpace:WorkSpace,campaignID: string) {
    this.customersService.getCustomers(campaignID,workSpace.id).subscribe(data => {
      this.customers = data.map(e => {
         return {id:e.payload.doc.id, ...e.payload.doc.data()} as Customer
      })
      this.checkDoplicate()
    })
  }
  checkDoplicate(){
    const values = this.customers

    const lookup = values.reduce((a, e) => {
       a[e.phone] = ++a[e.phone] || 0;
       return a;
},
 { });
this.duplicants = values.filter(e => lookup[e.phone])
this.duplicants.sort((a,b) => a.phone.localeCompare(b.phone));
let i 
if (this.duplicants.length>0) {i = this.duplicants[0].phone}
this.duplicants.forEach(item => {
  if(item.phone !== i){
    item.status="addDivider"
  }
  i = item.phone
})
if(this.duplicants.length > 0){this.isDouble = true}
else {this.isDouble = false}

  }

  deleteCustomer(customerID:string){
    this.customersService.deleteCustomer(this.campaignID,this.workspace.id,customerID)
  }

  addCustomer(){
    const dialogRef = this.dialog.open(addCustomer, {
      data: new Customer('','','')
    } );

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.customersService.addCustomer(this.campaignID,this.workspace.id,result).then(data => data )
      }
      });
  }

  editCustomer(customer:Customer){
    const dialogRef = this.dialog.open(addCustomer, {
      data: customer
    } );

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.customersService.updateCustomer(this.campaignID,this.workspace.id,result)
      }
      });
  }

  importCustomer(){
    this.import_export = !this.import_export
    let customerList:Customer[] = []
    const dialogRef = this.dialog.open(imports, {
      data: customerList,
      width: '90vw'
    } );

    dialogRef.afterClosed().subscribe(result => {
      result.forEach(row => {
        this.customersService.addCustomer(this.campaignID,this.workspace.id,row)
      });
      });
  }
  
}


@Component({
  selector: 'add-customer-dialog',
  templateUrl: 'addCustomer.companent.html',
  styleUrls: ['./customer-list.component.css']
})
      
export class addCustomer {

  status = Status;
  statuses = [];

  gender = Gender
  genders = []

  constructor(
    public dialogRef: MatDialogRef<addCustomer>,
    @Inject(MAT_DIALOG_DATA) public data: Customer) {
      this.statuses=Object.values(this.status);
      this.genders=Object.values(this.gender);
    }   
    

  onNoClick(): void {
    this.dialogRef.close();
  }
}

import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'imports-dialog',
  templateUrl: 'import.html',
  styleUrls: ['./customer-list.component.css']
})
      
export class imports implements AfterViewInit {

  displayedColumns: string[] = ['select','firstName', 'lastName', 'phone', 'gender'];
  dataSource: MatTableDataSource<Customer>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  status = Status;
  statuses = [];

  gender = Gender
  genders = []
  fileReaded: any;

  constructor(
    public dialogRef: MatDialogRef<addCustomer>,
    @Inject(MAT_DIALOG_DATA) public data: Customer) {
      this.statuses=Object.values(this.status);
      this.genders=Object.values(this.gender);
      this.dataSource = new MatTableDataSource([]);
    }   

     ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  selection = new SelectionModel<Customer>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Customer): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.phone + 1}`;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  csv2Array(fileInput: any){
    //read file from input
    this.fileReaded = fileInput.target.files[0];
    
    let reader: FileReader = new FileReader();
    reader.readAsText(this.fileReaded);
    
     reader.onload = (e) => {
     let csv: string = reader.result as string;
     let allTextLines = csv.split(/\r|\n|\r/);
     let headers = allTextLines[0].split(',');
     let lines = [];
    
      for (let i = 0; i < allTextLines.length; i++) {
        // split content based on comma
        let data = allTextLines[i].split(',');
        if (data.length === headers.length) {
          let tarr = [];
          for (let j = 0; j < headers.length; j++) {
            tarr.push(data[j]);
          }
    
         // log each row to see output 
         if(tarr[3] == "male"){tarr[3] = this.gender.male}
         else if(tarr[3] == "female"){tarr[3] = this.gender.female}
         else {tarr[3] = this.gender.nor}
         const customer:Customer = new Customer(tarr[0],tarr[1],tarr[2],tarr[3])
         lines.push(customer);
      }
     }
     // all rows in the csv file 
     this.dataSource = new MatTableDataSource(lines);
    } 
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

}


 


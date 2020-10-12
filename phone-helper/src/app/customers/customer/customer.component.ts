import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Customer } from '../customer';
import { CostumersService } from '../costumers.service';
import { UsersService } from 'src/app/users/users.service';
import { User } from 'src/app/users/user';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

interface formControl {
  type:string
  label:string
  value:string
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
@Input()
customer:Customer
@Input()
user:User

form:HTMLCollection

myFormGroup:FormGroup;
formTemplate:formControl[]

public keyValueForm: FormGroup;


  constructor(private customerService:CostumersService,private userService:UsersService,private formBuilder: FormBuilder) { 

    
    
    
  }
  

  ngOnInit(): void {
    const customer = new Customer("","","")
    this.setCustomerForm(customer)
  }

  setCustomerForm(customer:Customer){
    try {
      this.formTemplate =[]
      var result = Object.keys(customer).map((key) => [key,customer[key]]);
      result.forEach(data => {
        this.formTemplate.push({
          type:"textBox",
          label:data[0],
          value:data[1]
        })
      })
  
      let group={}    
      this.formTemplate.forEach(input_template=>{
        group[input_template.label]=new FormControl({value: input_template.value, disabled: this.checkIfEditabale(input_template.label)});  
      })
      this.myFormGroup = new FormGroup(group);
    } catch(err){
      
    }
    
  }

  ngOnChanges(changes: SimpleChanges) {

    if(changes.customer){
      this.setCustomerForm(changes.customer.currentValue)
    }
  
  }
  checkIfEditabale(key){
 
    const arr = ["id","lastInteraction"]
    if(arr.includes(key)){
      console.log (true)
      return true
    } else {
      console.log (false)
      return false
    }
  }



  onSubmit() {
    let customer:Customer
    customer = this.myFormGroup.value as Customer
    customer.id = this.customer.id
    // stop here if form is invalid
    if (this.myFormGroup.invalid) {
        return;
    }

    // display form values on success
    this.customerService.updateCustomer(this.user.campaign,this.user.workSpace,customer)
  }
}

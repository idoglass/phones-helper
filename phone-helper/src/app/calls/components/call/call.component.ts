import { Component, OnInit, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { Customer } from 'src/app/customers/customer';
import { Campaign, Question, Button, ButtonType } from 'src/app/campaign/campaign';
import { CostumersService } from '../../../customers/costumers.service'
import { WorkSpace, User } from 'src/app/users/user';
import { CallItem, callItem, Massage } from '../../call'
import { CallsService } from '../../calls.service';
@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.css']
})
export class CallComponent implements OnInit {
@Input() customer:Customer
@Input() campaign:Campaign
@Input() questions:Question[]
@Input() user:User

@Output() logsChanged = new EventEmitter();

logs:callItem[] =[]

problemText = "waiting for call... click start new call"
currentQuestions:Question[] = []
indexList:number[]

  constructor(private customersService:CostumersService, private callService:CallsService) {
    this.indexList=[1] 
  }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.questions){
      this.showQuestions(changes.questions.currentValue);
      
    }
    if(changes.customer){
      try {
        const q:Question = this.questions.find(question => {
          return question.index == 1
        } )as Question
        this.createLog(q.title,this.customer,this.user,this.campaign,"uuu",true,q.discription)
      } catch(err){
        
      }
      
  
    }
    // You can also use categoryId.previousValue and 
    // categoryId.firstChange for comparing old and new values  
  }

  createLog(title:string,customer:Customer,user:User,campaign:Campaign,callID:string,isUserTalking: boolean,discription?:string){
    const log = new callItem(title,customer,user,campaign,callID,isUserTalking,discription)
    this.logs.push(log)
    this.logsChanged.emit(this.logs)
    
  }

  showQuestions(questions,isback?){
    this.currentQuestions = []
    const lastQIndex = this.indexList.pop()
    this.indexList.push(lastQIndex)

    this.indexList.forEach(i => {
      try {
        const q:Question = questions.find(question => {
          return i == question.index
        })
        if(i == lastQIndex && i !== 1 && !isback) {
          this.createLog(q.title,this.customer,this.user,this.campaign,"uuu",true,q.discription)
        }
        this.currentQuestions.push(q)
      } catch(err){
        console.log("err")
      }
      })
    
  } 

  buttonClicked(button:Button){
    this.createLog(button.title,this.customer,this.user,this.campaign,"uuu",false)

    if(button.type == ButtonType.changeStatus ){
      this.changeStatus(button)
      this.logs.forEach(data => {
        this.callService.addItem(data)
      })
    }
    if(button.type == ButtonType.otherQuestion){
      this.otherQuestion(button)
    }
  }
  
  changeStatus(button:Button){

    confirm("you are abuot to set "+button.goTo+" status to customer")
    this.customer.status = button.goTo
    this.customersService.updateCustomer(this.user.campaign,this.user.workSpace,this.customer)
  }

  otherQuestion(button:Button){
    this.indexList.push(button.goTo)
    this.showQuestions(this.questions)
  }

  goBack(question:Question){
    this.logs.pop()
    this.logs.pop()
    if (question.index == 1) {

    } else {
      this.indexList.pop()
      this.showQuestions(this.questions,true)
    }
    
    this.logsChanged.emit(this.logs)
  }
  isLastQuestion(index:number): boolean{
    const last = this.indexList[this.indexList.length - 1]
    if(index == last){
      return true
    } else {
      return false
    }
  }
}

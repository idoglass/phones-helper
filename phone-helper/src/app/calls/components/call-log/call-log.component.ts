import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, ElementRef, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { Customer } from 'src/app/customers/customer';
import { User } from 'src/app/users/user';
import { callItem, Massage } from '../../call';
import { CallsService } from '../../calls.service';

@Component({
  selector: 'app-call-log',
  templateUrl: './call-log.component.html',
  styleUrls: ['./call-log.component.css']
})
export class CallLogComponent implements OnChanges {
@Input() logs:callItem[]
@Input() user:User
@Input() customer:Customer
messagesList:Massage[]
pastLogs:callItem[]
pastMessagesList:Massage[] = []
@ViewChildren('messages') messages: QueryList<any>;
@ViewChild('content') content: ElementRef;


  constructor(private callService:CallsService) { }

  ngOnInit(): void {

  }
setPastMesseges(){
  this.pastLogs.forEach(log=>{
    let msg:Massage = {
      date: log.date,
      title: log.title,
      discription: log.discription,
      sender: "",
    }

  if (log.isUserTalking) {
      msg.sender = log.userName
  } else {
      msg.sender =  log.CustomerName
  }

    this.pastMessagesList.push(msg)
  })
}
setPastLogs(){
  try {
    console.log(this.user.workSpace,this.user.campaign,this.customer.id)
    this.callService.getCustomerItems(this.user.workSpace,this.user.campaign,this.customer.id).subscribe(data => {
      this.pastLogs = data.map(e => {
        console.log(e.payload.doc.data())
        const object = e.payload.doc.data()
        return {
          id: e.payload.doc.id,
          ...object
        } as callItem ;
      });
      console.log(this.pastLogs,"this.pastLogs")
      this.setPastMesseges()
      
    })
  } catch(err){
    
  }
  
}
  ngOnChanges(changes: SimpleChanges) {
    if(changes.logs){
      try {
        this.messagesList = []
      this.logs.forEach(log=>{
        this.messagesList.push(log.massage())
      })
      } catch(err){

      }
      
      
    } 
    if(changes.customer){
      this.setPastLogs()
    }
  }

  ngAfterViewInit() {
    this.scrollToBottom();
    this.messages.changes.subscribe(this.scrollToBottom);
  }

  scrollToBottom = () => {
    try {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
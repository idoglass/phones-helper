import { User } from '../users/user'

export interface Campaign {
    id:string
    title:string
    isActive:boolean
    color:string
    discription:string
    manager:User
    statusList:string[]
}

export class Campaign implements Campaign {
    id:string
    title:string
    isActive:boolean
    color:string ="white"
    discription:string
    manager:User
    statusList:string[]
    statusObjList:CustomerStatus[]
    Question:Question[]

    constructor(){
        this.isActive = true
        this.statusObjList = [
            {name:"פתוח",isClosed:false},
            {name:"טעות במספר",isClosed:true},
            {name:"לא ענו",isClosed:false},
            {name:"זמן אחר",isClosed:false},
        ]
    }
}

export enum Status {
    open = "פתוח",
    yes = "כן",
    no = "לא",
    close = "סגור",
    otherTime = "זמן אחר",
    noAnswer = "לא ענו",
    wrongNumber = "טעות במספר"
  }

  export interface CustomerStatus {
      name:string
      isClosed:boolean

  }

export enum ButtonType {
    otherQuestion = "שאלה אחרת",
    changeStatus = "שנה סטטוס"
}

export class Question  {
    id:string
    title:string
    index:number
    discription:string
    buttons:Button[] = []
    constructor(index?:number){
        if(index){this.index = index}
    }
}

export class Button  {
    title:string
    goTo:any
    type:ButtonType
    toolTip:string
    color:string
}

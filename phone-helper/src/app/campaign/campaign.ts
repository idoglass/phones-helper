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
    color:string
    discription:string
    manager:User
    statusList:string[]
    Question:Question[]
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
}

export class Button  {
    title:string
    goTo:any
    type:ButtonType
    toolTip:string
    color:string
}

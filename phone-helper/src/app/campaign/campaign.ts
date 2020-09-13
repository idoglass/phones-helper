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

enum Satus {
    open = "פתוח",
    yes = "כן",
    no = "לא",
    close = "סגור",
    otherTime = "זמן אחר",
    noAnswer = "לא ענו",
    wrongNumber = "טעות במספר"
  }
enum ButtonType {
    otherQuestion = "שאלה אחרת",
    changeStatus = "שנה סטטוס"
}

export class Question  {
    id:string
    title:string
    index:number
    discription:string
    button:Button[]
}

export class Button  {
    id:string
    title:string
    goTo:string
    type:ButtonType
    toolTip:string
    color:string
}

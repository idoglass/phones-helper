import { Campaign } from '../campaign/campaign'
import { CostumersService } from '../customers/costumers.service'
import { Customer } from '../customers/customer'
import { User } from '../users/user'

export interface CallItem {
    id:string
    title:string
    discription:string
    callID:string
    customerID:string
    CustomerName:string
    date:Date
    userID:string
    userName:string
    campaignID:string
    workspaceID:string
    isUserTalking:boolean
}

export interface Massage {
    sender:string
    date:Date
    title:string
    discription:string
}
export class callItem implements CallItem {
    public costumersService:CostumersService

    discription: string
    customerID: string
    CustomerName: string
    date: Date 
    userID: string
    userName: string
    campaignID: string
    callID: string
    id:string
    title:string
    workspaceID:string
    isUserTalking: boolean

    constructor(title:string,customer:Customer,user:User,campaign:Campaign,callID:string,isUserTalking: boolean,discription?:string){
        
        this.userID = user.uid
        this.userName = user.displayName
        this.workspaceID = user.workSpace
        this.isUserTalking = isUserTalking

        this.campaignID = campaign.id
        this.callID = callID

        this.title = title
        if(discription){this.discription = discription}
        this.date = new Date()

        this.customerID = customer.id
        this.CustomerName = customer.firstName +" "+ customer.lastName
        
    }

    public massage():Massage {
        let msg:Massage = {
            date: this.date,
            title: this.title,
            discription: this.discription,
            sender: "",
        }

        

        if (this.isUserTalking) {
            msg.sender = this.userName
        } else {
            msg.sender =  this.CustomerName
        }
        return msg
    }
    
        
}
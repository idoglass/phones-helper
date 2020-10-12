import { Status } from '../campaign/campaign'

export interface Customer {
    id: string
    firstName: string
    lastName: string
    phone: string
    status: string
    lastInteraction: Date
    gender:Gender
}

export enum Gender {
    male = "Male",
    female = "Female",
    nor = "Rather Not Say"
}
export class Customer implements Customer {
    id: string
    firstName: string
    lastName: string
    phone: string
    status: string
    lastInteraction: Date = new Date
    gender:Gender = Gender.nor
    isClosed:boolean

    constructor(fname:string,lname:string,phone:string,gender?:Gender){
        if(gender){this.gender = gender}
        this.firstName = fname
        this.lastName = lname
        this.phone = phone
        this.status = Status.open
    }

    get getFullName(){
        return this.firstName + " " + this.lastName
    }
}
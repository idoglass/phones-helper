export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
    roles: Roles;
    workSpace: string
    campaign:string
 }

 export class user implements User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
    roles: Roles
    workSpace: string
    campaign:string
 }

 export interface WorkSpace {
    id: string;
    color: string;
    title: string;
    img: string;
    discription: boolean;
 }

 export class WorkSpace implements WorkSpace {
    id: string;
    color: string;
    title: string;
    img: string;
    discription: boolean;
 }

 export interface Roles { 
   user?: boolean;
   editor?: boolean;
   admin?: boolean;
}
export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
    role: string;
    workSpace: string
 }

 export class user implements User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
    role: string;
    workSpace: string
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

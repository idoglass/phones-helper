import { Injectable } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { User,user, WorkSpace } from './user';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService  {


usercollction:  AngularFirestoreCollection<User>;
user: Observable<User>
public fullUser:User
uid:string

  constructor(
    public authService: AuthService,
    private afs: AngularFirestore
    ) { 
      this.uid = JSON.parse(localStorage.getItem('user')).uid
      this.setUser()
    }
    async setUser(){
       await this.getFullUserDetails().subscribe(data => {
        console.log(data.payload.data() ,"data")
        this.fullUser =  {id:data.payload.id, ...data.payload.data()} as User  
        return this.fullUser
        } )
    }  
    

    public getFullUserDetails():any{
        
        const fullUser = this.afs.collection<User>('users').doc(this.uid).snapshotChanges();  
        return fullUser
    }

    getWorkSpace(password):any{
      return this.afs.collection<WorkSpace>('workSpace').doc(password).snapshotChanges();  
    }

    updateUser(user:User){
      this.afs.collection<User>('users').doc(user.uid).update(user);
    }
  }


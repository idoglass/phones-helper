import { Component, OnInit, NgZone, Renderer2, ViewChild, ElementRef  } from '@angular/core';
import { AuthService } from "../../shared/auth.service";
import { Router } from "@angular/router";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UsersService } from '../users.service'
import { User, user } from "../user"
import { from, Observable } from 'rxjs';
import { AngularFirestoreDocument, AngularFirestore, DocumentChangeAction, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


fullUser:User

  constructor(
    public authService: AuthService,
    public userService: UsersService,
    public router: Router,
    public ngZone: NgZone,
    private afs: AngularFirestore,
    private sanitizer: DomSanitizer
  ) {
    this.fullUser = new user
   }

  ngOnInit() { 
    this.getUser()
   }

   getUser():User {
    // we call getRecipes() from RecipeService to get list of employees
   
    return this.userService.getFullUserDetails().subscribe(data => {
      console.log(data.payload.data() ,"data")
      this.fullUser =  {id:data.payload.id, ...data.payload.data()} as User  
      } )
      }  

}

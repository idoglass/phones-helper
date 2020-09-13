import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {


  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    console.log("init")
    this.authService.getIsLoggedIn().subscribe(isLogged => {
      if(isLogged == true) {
        this.router.navigate(['/index'])
        console.log("signup")
      }
    })
   }

}
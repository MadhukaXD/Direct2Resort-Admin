import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoggedIn : Observable<boolean>;
  isLoading: boolean = false;

  constructor(private loginService: LoginService) {
    loginService.isLoggedIn().subscribe(data => {
      if(data) {
        loginService.routeUser();
      }    
    });
  }

  userData: {
    email: string,
    password: string
  }

  ngOnInit() {
    this.userData = {
      email: '',
      password: ''
    }
  }

  login() {
    this.isLoading = true;
    this.loginService.login(this.userData.email, this.userData.password).subscribe(
      () => {
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        console.log(error);        
      },
      () => {
        this.isLoading = false;
      }
    )
  }
}

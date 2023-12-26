import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Route, Router} from "@angular/router";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated: boolean=false;
  storage: Storage = sessionStorage;
  constructor(private authService: AuthenticationService,private router: Router) {
  }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(
        isAuth => this.isAuthenticated = isAuth
    );
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }



}

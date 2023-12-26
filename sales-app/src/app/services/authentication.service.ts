import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject, tap} from "rxjs";
import {User} from "../common/user";
import {CartService} from "./cart.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private registerUrl: string = 'http://localhost:8080/register';
  private loginUrl: string = 'http://localhost:8080/login';
  isAuthenticated = new BehaviorSubject<boolean>(false);
  constructor(private httpClient: HttpClient) {
    this.checkIsAuthenticated();
  }
  registerUser(user: User):Observable<any>{
    return this.httpClient.post<User>(this.registerUrl,user);
  }
  loginUser(username: string, password: string):Observable<any>{
    return this.httpClient.post<any>(this.loginUrl,{username,password})
      .pipe(tap(response => {
        localStorage.setItem('accessToken',response.accessToken);
        sessionStorage.setItem('userEmail', username);
        this.isAuthenticated.next(true);
      }));
  }

  private checkIsAuthenticated(): void {
    const isAuthenticated = !!localStorage.getItem('accessToken');
    this.isAuthenticated.next(isAuthenticated);
  }

  isLoggedIn():Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }
  logout(): void {
    // Implement logout logic if needed, e.g., clearing localStorage
    localStorage.removeItem('accessToken');
    this.isAuthenticated.next(false);
  }
}

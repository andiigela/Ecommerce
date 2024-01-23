import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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
    return this.httpClient.post<any>(this.registerUrl,user);
  }
  loginUser(username: string, password: string, token: string):Observable<any>{
    token = localStorage.getItem('accessToken')!;

    return this.httpClient.post<any>(this.loginUrl,{username,password,token})
      .pipe(tap(response => {
        sessionStorage.setItem('userEmail', response.userName);
        localStorage.setItem('accessToken',response.accessToken)
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
    sessionStorage.removeItem('userEmail');
    this.isAuthenticated.next(false);
  }
}

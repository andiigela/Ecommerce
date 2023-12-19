import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../common/user";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private registerUrl: string = 'http://localhost:8080/register';
  private loginUrl: string = 'http://localhost:8080/login';
  constructor(private httpClient: HttpClient) {
  }
  registerUser(user: User):Observable<any>{
    return this.httpClient.post<User>(this.registerUrl,user);
  }
  loginUser(username: string, password: string):Observable<any>{
    return this.httpClient.post<any>(this.loginUrl,{username,password});
  }
}

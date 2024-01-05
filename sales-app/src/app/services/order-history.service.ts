  import { Injectable } from '@angular/core';
  import {HttpClient, HttpHeaders} from "@angular/common/http";
  import {map, Observable, throwError} from "rxjs";
  import {OrderHistory} from "../common/order-history";

  @Injectable({
    providedIn: 'root'
  })
  export class OrderHistoryService {

    private orderUrl = "http://localhost:8080/orders";
    localStorage: Storage = localStorage;
    constructor(private httpClient: HttpClient) {}
    getOrderHistory(theEmail: string): Observable<GetResponseOrderHistory>{
      const accessToken = this.localStorage.getItem('accessToken')!;
      if (!accessToken) {
        return throwError('Access token not available');
      }
      const headers = new HttpHeaders({
        'Authorization':  'Bearer ' + accessToken
      });
      const options = {
        headers: headers // Include headers in the request options
      };
      const orderHistoryUrl = `${this.orderUrl}/search/findByCustomerEmail?email=${theEmail}`;
      return this.httpClient.get<GetResponseOrderHistory>(orderHistoryUrl,options);
    }
  }
  interface GetResponseOrderHistory{
    _embedded: {
      orders: OrderHistory[];
    }
  }

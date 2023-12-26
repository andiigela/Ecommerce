import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {OrderHistory} from "../common/order-history";

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private orderUrl = "http://localhost:8080/orders";
  constructor(private httpClient: HttpClient) {}
  getOrderHistory(theEmail: string): Observable<GetResponseOrderHistory>{
    const orderHistoryUrl = `${this.orderUrl}/search/findByCustomerEmail?email=${theEmail}`;
    return this.httpClient.get<GetResponseOrderHistory>(orderHistoryUrl);
  }
}
interface GetResponseOrderHistory{
  _embedded: {
    orders: OrderHistory[];
  }
}

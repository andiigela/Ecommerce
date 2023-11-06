import { Component } from '@angular/core';
import {SalesPerson} from "./sales-person";

@Component({
  selector: 'app-sales-person-list',
  templateUrl: './sales-person-list.component.html',
  styleUrls: ['./sales-person-list.component.css']
})
export class SalesPersonListComponent {
  salesPersonList: SalesPerson[] = [
    new SalesPerson("Andi","Gela","andigela@gmail.com",1000),
    new SalesPerson("Rinor","Maliqi","rinormaliqi@gmail.com",6000),
    new SalesPerson("Dren","Halili","drenhalili@gmail.com",2000),
    new SalesPerson("Art","Grantolli","artgrantolli@gmail.com",4000),
  ];
}

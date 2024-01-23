import { Injectable } from '@angular/core';
import {CartItem} from "../common/cart-item";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];
  totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalQuantity: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  // storage: Storage = sessionStorage;
  storage: Storage = localStorage;
  constructor() {
    let data = JSON.parse(this.storage.getItem("cartItems")!);
    if(data != null){
      this.cartItems=data;
      this.computeCartTotals();
    }
  }
  addToCart(theCartItem: CartItem){
    let alreadyExistsInCart :boolean = false;
    let existingCartItem: CartItem|undefined = undefined;
    if(this.cartItems.length > 0){
        existingCartItem = this.cartItems.find(item=>item.id === theCartItem.id); // returns CartItem ose Undefined
        alreadyExistsInCart = (existingCartItem != undefined);
    }
    if(alreadyExistsInCart){
      existingCartItem!.quantity++;
    } else {
      this.cartItems.push(theCartItem);
    }
    this.computeCartTotals();
  }
  computeCartTotals(){
    let totalPriceValue: number = 0;
    let totalQuantityValue: number =0;
    for(let item of this.cartItems){
      totalPriceValue += item.unitPrice*item.quantity;
      totalQuantityValue += item.quantity;
    }
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    this.persistCartItems();

  }
  decrement(cartItem: CartItem){
    let existingCartItem = this.cartItems.find(item => item.id === cartItem.id);
    if(existingCartItem != undefined && existingCartItem.quantity > 0){
      existingCartItem.quantity--;
    }
    if(existingCartItem != undefined && existingCartItem.quantity == 0){
      this.removeFromCart(cartItem);
    }
    this.computeCartTotals();
  }
  removeFromCart(cartItem: CartItem){
    let index = this.cartItems.findIndex(item => item.id === cartItem.id);
    if(index > -1){
      this.cartItems.splice(index,1);
    }
    this.computeCartTotals();
  }
  persistCartItems(){
    this.storage.setItem('cartItems',JSON.stringify(this.cartItems));
  }
}

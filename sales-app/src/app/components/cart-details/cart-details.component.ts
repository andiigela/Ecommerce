import {Component, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {CartItem} from "../../common/cart-item";

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit{
  cartItems: CartItem[] = [];
  totalQuantity: number = 0;
  totalPrices: number = 0;
  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.listOfProducts();
  }
  listOfProducts(){
    this.cartItems = this.cartService.cartItems;
    this.cartService.totalQuantity.subscribe(data => this.totalQuantity=data);
    this.cartService.totalPrice.subscribe(data => this.totalPrices=data);
    this.cartService.computeCartTotals();
  }
  increment(cartItem: CartItem){
    this.cartService.addToCart(cartItem);
  }
  decrement(cartItem: CartItem){
    this.cartService.decrement(cartItem);
  }
  remove(cartItem: CartItem){
    this.cartService.removeFromCart(cartItem);
  }

}

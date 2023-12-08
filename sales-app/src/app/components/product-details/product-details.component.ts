import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../common/product";
import {CartItem} from "../../common/cart-item";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  private isActive: boolean = false;
  public product: Product = new Product('','','','',0,'',false,0,new Date(), new Date())
  constructor(private productService: ProductService, private route: ActivatedRoute,private cartService: CartService) {
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>this.getProduct())
  }
  getProduct(){
    this.isActive = this.route.snapshot.paramMap.has('id');
    if(this.isActive){
      const param:string = this.route.snapshot.paramMap.get('id')!;
      this.productService.getProductById(param).subscribe(product => {
          this.product=product;
        }
      );
    }
  }
  addToCart(){
    let cartItem = new CartItem(this.product);
    this.cartService.addToCart(cartItem);
  }

}

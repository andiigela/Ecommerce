import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";
import {ActivatedRoute} from "@angular/router";
import {CartItem} from "../../common/cart-item";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  products: Product[] = [];
  currentCategoryId: number=1;
  previousCategoryId: number=1;
  searchMode: boolean = false;

  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;

  previousKeyword: string = '';

  constructor(private productService: ProductService,private route: ActivatedRoute,private cartService: CartService) {}
  ngOnInit():void{
    this.route.paramMap.subscribe(()=>
      this.listProducts()
    );
  }
  listProducts(){
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchProducts()
    } else {
      this.handleListProducts();
    }
  }
  handleSearchProducts(){
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    if(this.previousKeyword != theKeyword){
      this.thePageNumber=1; // gjith duhet me bo 1 ose atje 0 pershkak qe kur tbon search this pagen e par ta kthen, veq nese
      //ka shum elemente e nuk i nxen ne page 1 ose 0
    }
    this.previousKeyword=theKeyword;

    this.productService.searchProducts(this.thePageNumber-1,this.thePageSize,theKeyword)
      .subscribe(this.processResult());
  }
  processResult(){
    return (data: any)=>{
      this.products=data._embedded.products;
      this.thePageSize = data.page.size;
      this.thePageNumber=data.page.number+1;
      this.theTotalElements=data.page.totalElements;
    }
  }
  handleListProducts(){
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if(hasCategoryId){
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber = 1;
    }
    this.previousCategoryId=this.currentCategoryId;


    this.productService.getProductList(this.thePageNumber-1,this.thePageSize,this.currentCategoryId)
      .subscribe(this.processResult())
    };
    updatePage(pageSize: string): void {
      this.thePageSize = +pageSize;
      this.thePageNumber = 1;
      this.listProducts();
    }
    addToCart(theProduct: Product){
      const cartItem = new CartItem(theProduct);
      this.cartService.addToCart(cartItem);
    }

}

import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  products: Product[] = [];
  currentCategoryId: number=1;
  constructor(private productService: ProductService,private route: ActivatedRoute) {}
  ngOnInit():void{
    this.route.paramMap.subscribe(()=>{
      this.listProducts();
    })
  }
  listProducts(){
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if(hasCategoryId){
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    this.productService.getProductList(this.currentCategoryId).subscribe(data=>{this.products=data})
  }
}

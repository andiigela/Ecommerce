import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ProductCategory} from "../../common/product-category";

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {
    categories: ProductCategory[] = [];
    constructor(private productService: ProductService) {
    }
    ngOnInit(): void {
        this.getCategoryList();
    }
    getCategoryList(){
      this.productService.getCategoryList().subscribe(
        data => {
            this.categories = data;
            console.log("Categories = " + JSON.stringify(data))
        }
      )
    }


}

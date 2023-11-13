import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable} from "rxjs";
import {Product} from "../common/product";
import {ProductCategory} from "../common/product-category";
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/products';
  private categoryUrl = 'http://localhost:8080/productCategories';
  constructor(private httpClient:HttpClient) { }
  getProductList(theCategoryId:number): Observable<Product[]>{
    const searchUrl = `${this.baseUrl}/search/findByProductCategoryId?id=${theCategoryId}`;
    return this.httpClient.get<GetResponse>(searchUrl)
      .pipe(map(response=>response._embedded.products));
  }
  getCategoryList(): Observable<ProductCategory[]>{
    return this.httpClient.get<GetCategoryResponse[]>(this.categoryUrl);
  }

}
interface GetResponse {
  _embedded: {
    products: Product[];
  }
}
interface GetCategoryResponse {
  id: number,
  name: string
}

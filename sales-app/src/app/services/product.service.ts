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
  getProductList(thePage: number,thePageSize: number,theCategoryId:number): Observable<GetResponse>{
    const searchUrl = `${this.baseUrl}/search/findByProductCategoryId?id=${theCategoryId}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponse>(searchUrl)
      .pipe(map(response=>response));
  }
  getCategoryList(): Observable<ProductCategory[]>{
    return this.httpClient.get<GetCategoryResponse[]>(this.categoryUrl);
  }
  searchProducts(thePage:number,thePageSize: number,theKeyword: string): Observable<GetResponse>{
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponse>(searchUrl);
  }
  getProductById(id: string): Observable<Product>{
    const searchUrl = `${this.baseUrl}/search/findProductBySku?sku=${id}`;
    return this.httpClient.get<Product>(searchUrl);
  }
}
interface GetResponse {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
interface GetCategoryResponse {
  id: number,
  name: string
}

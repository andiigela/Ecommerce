import {Product} from "./product";

export class CartItem {
  id: string;
  name: string;
  imageUrl: string;
  unitPrice: number;
  quantity: number;
  constructor(product: Product) {
    this.id = product.sku;
    this.name = product.name;
    this.imageUrl = product.imageUrl;
    this.unitPrice=product.price;
    this.quantity = 1;
  }
}

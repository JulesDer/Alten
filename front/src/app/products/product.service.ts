import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ProductClass} from './product.class';

@Injectable({
  providedIn: 'root',
})

export class ProductService {
  private jsonURL = 'assets/products.json';
  private apiUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(this.jsonURL);
  }

  createProduct(product: ProductClass): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.post<ProductClass>(url, product);
  }

  deleteProduct(productId): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.delete(url);
  }

  updateProduct(product: ProductClass): Observable<any> {
    const updateUrl = `${this.apiUrl}/${product.id}`;
    return this.http.post(updateUrl, product);
  }
}

import { Injectable } from '@angular/core';
import { CommonApi } from '../api/common.api';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productStore = new Map<number, BehaviorSubject<number | Product>>();
  private isRefreshing = false;

  constructor(
    private commonApi: CommonApi,
  ) {
  }

  public getProductDetails(productId: number): Observable<number | Product> {
    if (!this.productStore.has(productId)) {
      this.productStore.set(productId, new BehaviorSubject<number | Product>(productId));
      this.refreshLocalStore();
    }
    return this.productStore.get(productId)!.asObservable();
  }

  private refreshLocalStore() {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.commonApi.fetchProductDetails().pipe(
        map(response => {
          // This aims to bloat the response with a lot of data, to simulate a larger database
          const bloatResponse = Array.from({ length: 500000 }, (_, index) => ({
            id: -1 * (index + 1),
          }));
          return [...bloatResponse, ...response.products];
        }),
      ).subscribe((products: Product[]) => {
        products.forEach(product => {
          if (this.productStore.has(product.id)) {
            (this.productStore.get(product.id)!.next(product));
          } else {
            this.productStore.set(product.id, new BehaviorSubject<number | Product>(product));
          }

        });
        this.isRefreshing = false;
      })
    }
  }
}

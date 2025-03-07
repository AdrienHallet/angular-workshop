import { Injectable } from '@angular/core';
import { CommonApi } from '../api/common.api';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './product.model';

/**
 * Manipulates products
 */
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

  /**
   * Returns the details of a product based on its ID.
   *
   * @param productId the ID of the product to retrieve
   */
  public getProductDetails(productId: number): Observable<number | Product> {
    if (!this.productStore.has(productId)) {
      this.productStore.set(productId, new BehaviorSubject<number | Product>(productId));
      this.refreshLocalStore();
    }
    return this.productStore.get(productId)!.asObservable();
  }

  private refreshLocalStore() {
    // Because in this simplistic application we fetch all products at once,
    // we know that if we sent one HTTP call, we already are going to receive all products.
    // In other use-cases, you could deduce, based on the ID, if the product is already being
    // fetched or not.
    // This logic avoids to send multiple requests if we want to fetch the same product in multiple places.
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.commonApi.fetchProductDetails().subscribe((products: Product[]) => {
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

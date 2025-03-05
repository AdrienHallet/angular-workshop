import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonApi {

  private introducedDelay = 0;

  constructor(
    private http: HttpClient,
  ) {
  }

  fetchCarts(): Observable<any> {
    return this.http.get(`https://dummyjson.com/carts?delay=${this.introducedDelay}&limit=50`).pipe(
      map((response: any) => {
        return {
          ...response,
          carts: response.carts.map(cart => ({
            ...cart,
            // This response is transformed to mimic an API where only the ID is available
            products: cart.products.map(product => product.id),
          })),
        };
      }),
    );
  }

  fetchProductDetails(): Observable<any> {
    return this.http.get(`https://dummyjson.com/products?delay=${this.introducedDelay}&limit=200`);
  }

  fetchUsers(): Observable<any> {
    return this.http.get(`https://dummyjson.com/users?delay=${this.introducedDelay}&limit=200`);
  }
}

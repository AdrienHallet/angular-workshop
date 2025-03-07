import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Cart } from '../cart/cart.model';
import { Product } from '../product/product.model';
import { User } from '../user/user.model';

/**
 * Defines the HTTP calls to retrieve data.
 */
@Injectable({
  providedIn: 'root',
})
export class CommonApi {

  private introducedDelay = 0; // Fake delay to mimic a heavier server response

  constructor(
    private http: HttpClient,
  ) {
  }

  /**
   * Fetches the carts from the server.
   */
  fetchCarts(): Observable<Cart[]> {
    return this.http.get(`https://dummyjson.com/carts?delay=${this.introducedDelay}&limit=50`).pipe(
      map((response: any) => {
        return response.carts.map(cart => ({
            ...cart,
            // This response is transformed to mimic an API where only the ID is available
            products: cart.products.map(product => product.id),
          }),
        );
      }),
    );
  }

  /**
   * Fetches the products from the server.
   */
  fetchProductDetails(): Observable<Product[]> {
    return this.http.get<{
      products: Product[]
    }>(`https://dummyjson.com/products?delay=${this.introducedDelay}&limit=200`).pipe(
      map((response) => {
        // This aims to bloat the response with a lot of data, to simulate a larger database
        const bloatResponse = Array.from({ length: 500000 }, (_, index) => ({
          id: -1 * (index + 1),
        }) as Product);
        return [...bloatResponse, ...response.products];
      }),
    );
  }

  /**
   * Fetches the users from the server.
   */
  fetchUsers(): Observable<User[]> {
    return this.http.get<{ users: User[] }>(`https://dummyjson.com/users?delay=${this.introducedDelay}&limit=200`).pipe(
      map(response => response.users),
    );
  }
}

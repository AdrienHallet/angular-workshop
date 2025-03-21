import { ItemApi } from '../api/item.api';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GridService {

  constructor(
    private itemApi: ItemApi,
  ) {
  }

  public getCarts() {
    return this.itemApi.fetchCarts().pipe(
      map(response => response.carts),
    );
  }

  public getUsers() {
    return this.itemApi.fetchUsers().pipe(
      map(response => response.users),
    )
  }

  public getProducts() {
    return this.itemApi.fetchProductDetails().pipe(
      map(response => {
        // This aims to bloat the response with a lot of data, to simulate a larger database
        const bloatResponse = Array.from({ length: 500000 }, (_, index) => ({
          id: -1 * (index + 1),
        }));
        return [...bloatResponse, ...response.products];
      }),
    );
  }

}

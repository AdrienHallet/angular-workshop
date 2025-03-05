import { Cart } from './cart.model';
import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { CommonApi } from '../api/common.api';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private cartsStore: WritableSignal<Cart[]> = signal([])

  constructor(
    private commonApi: CommonApi,
  ) { }

  public getStore(): Signal<Cart[]> {
    return this.cartsStore.asReadonly();
  }

  public fetchAllCarts(): Observable<boolean> {
    return this.commonApi.fetchCarts().pipe(
      map(response => response.carts),
      tap(carts => this.cartsStore.set(carts)),
      map(_ => true),
      catchError(error => {
        console.error(error);
        return of(false);
      }),
    );
  }

}

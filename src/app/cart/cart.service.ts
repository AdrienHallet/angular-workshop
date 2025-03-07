import { Cart } from './cart.model';
import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
import { CommonApi } from '../api/common.api';
import { toSignal } from '@angular/core/rxjs-interop';

/**
 * Manipulates carts.
 */
@Injectable({
  providedIn: 'root',
})
export class CartService {

  private cartsStore: WritableSignal<Cart[]> = signal([])

  constructor(
    private commonApi: CommonApi,
  ) { }

  /**
   * Returns the carts store.
   */
  public getStore(): Signal<Cart[]> {
    return this.cartsStore.asReadonly();
  }

  /**
   * An observable that, when fired, will update the carts store
   * and return true if everything is ready, false if error.
   */
  public fetchAllCarts(): Signal<boolean | undefined> {
    return toSignal(this.commonApi.fetchCarts().pipe(
      tap(carts => this.cartsStore.set(carts)),
      map(_ => true),
      catchError(error => {
        console.error(error);
        return of(false);
      }),
    ));
  }

}

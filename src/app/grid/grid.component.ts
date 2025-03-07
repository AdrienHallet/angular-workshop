import { Component, computed, Signal } from '@angular/core';
import { UserPipe } from '../user/user.pipe';
import { AsyncPipe } from '@angular/common';
import { ProductPipe } from '../product/product.pipe';
import { CartService } from '../cart/cart.service';
import { Cart } from '../cart/cart.model';

@Component({
  selector: 'grid-component',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  imports: [
    UserPipe,
    AsyncPipe,
    ProductPipe,
  ],
})
export class TableExampleComponent {
  carts: Signal<Cart[]>;
  totalCarts: Signal<number>;
  isReady: Signal<boolean | undefined>;

  constructor(
    private cartService: CartService,
  ) {
    this.carts = this.cartService.getStore();
    this.totalCarts = computed(() => {
      return Math.round(this.carts().reduce((acc, cart) => acc + cart.total, 0))
    })
    this.isReady = this.cartService.fetchAllCarts();
  }
}

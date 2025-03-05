import { Component, OnInit } from '@angular/core';
import { GridService } from './grid.service';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'grid-component',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class TableExampleComponent implements OnInit {
  carts: Array<any> = [];
  totalCarts: number = 0;
  products: Array<any> = [];
  users: Array<any> = [];
  isLoading = false;

  constructor(
    private gridService: GridService,
  ) {
  }

  ngOnInit() {
    this.initializeGrid();
  }

  protected getProductDetails(productId: number) {
    return this.products.find(product => product.id === productId);
  }

  protected getUserDetails(userId: number) {
    return this.users.find(user => user.id === userId);
  }

  private initializeGrid() {
    this.gridService.getProducts().pipe(
      tap(_ => this.isLoading = true),
      tap(products => this.products = products),
      switchMap(_ => this.gridService.getUsers()),
      tap(users => this.users = users),
      switchMap(_ => this.gridService.getCarts()),
    ).subscribe(carts => {
      this.carts = carts;
      this.totalCarts = Math.round(carts.reduce((acc, cart) => acc + cart.total, 0));
      this.isLoading = false;
    })
  }
}

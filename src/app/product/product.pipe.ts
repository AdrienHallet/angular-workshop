import { Pipe, PipeTransform, signal } from '@angular/core';

import { map, Observable } from 'rxjs';
import { ProductService } from './product.service';
import { Product } from './product.model';

/**
 * Displays a human-readable text for the given product.
 */
@Pipe({
  name: 'product',
})
export class ProductPipe implements PipeTransform {

  user = signal(undefined);

  constructor(
    private productService: ProductService,
  ) {
  }

  transform(productId: number): Observable<string> {
    return this.productService.getProductDetails(productId).pipe(
      map(product => this.productToString(product)),
    );
  }

  private productToString(product: number | Product): string {
    return typeof product === 'number' ? `Product #${product}` : product.title;
  }
}

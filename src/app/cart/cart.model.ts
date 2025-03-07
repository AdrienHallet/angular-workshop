/**
 * Defines a cart - a basket of goods for a given user.
 */
export type Cart = {
  id: number;
  userId: number;
  products: number[];
  total: number;
}

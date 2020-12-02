import { IProduct } from '../models/IProducts';
import productsData from '../data/products.json';

export function getProducts(): IProduct[] {
  return productsData;
}

export function getProductsAsync(): Promise<IProduct[]> {
  return Promise.resolve(getProducts());
}

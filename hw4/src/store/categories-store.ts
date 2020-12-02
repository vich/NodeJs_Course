import { ICategory } from '../models/ICategory';
import categoriesData from '../data/categories.json';

export function getCatrgories(): ICategory[] {
  return categoriesData;
}

export function getCatrgoriesAsync(): Promise<ICategory[]> {
  return Promise.resolve(getCatrgories());
}

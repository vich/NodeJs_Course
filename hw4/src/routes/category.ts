import { NextFunction, Request, Response, Router } from 'express';
import { generateId } from '../utils/id-helper';
import categoriesData from '../data/categories.json';
import * as handlers from '../utils/common';
import { Category } from '../models/category';

const categories: Category[] = [];

const router = Router();

const resolveCategoryHandler = (req: Request, res: Response, next: NextFunction): void => {
  console.log('enter resolveCategoryHandler');
  const categoryId = req.params.id;
  if (!handlers.isValidUuid(categoryId)) {
    res.sendStatus(400);
    return;
  }

  const categoryIndex = categories.findIndex((category) => category.id === categoryId);
  if (categoryIndex < 0) {
    res.sendStatus(404);
    return;
  }
  res.locals.categoryIndex = categoryIndex;
  res.locals.category = categories[categoryIndex];
  next();
};

router.get('/', (req, res) => {
  console.log('enter route.get(/)');

  res.send(categories);
});

router.get('/:id', resolveCategoryHandler, (req, res) => {
  console.log('enter route.get(/:id)');
  const category = req.body as Category;

  res.send(category);
});

router.post('/', handlers.validateNameHandler, (req, res) => {
  console.log('enter route.post(/)');
  const category = req.body as Category;
  category.id = generateId();
  categories.push(category);

  res.status(201).send(category);
});

router.put('/:id', handlers.validateNameHandler, resolveCategoryHandler, (req, res) => {
  console.log('enter route.put(/:id)');
  const category = req.body as Category;
  category.id = res.locals.category.id;
  Object.assign(res.locals.category, category);

  res.send(categories);
});

router.delete('/:id', resolveCategoryHandler, (req, res) => {
  console.log('enter route.delete(/:id)');
  categories.splice(res.locals.categoryIndex, 1);

  res.sendStatus(204);
});

export { router };
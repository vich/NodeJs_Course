import { NextFunction, Request, Response, Router } from 'express';
import { generateId } from '../utils/id-helper';
import * as handlers from '../utils/common';
import { IProduct } from '../models/IProducts';

const router = Router();
const products: IProduct[] = [];

const resolveProductHandler = (req: Request, res: Response, next: NextFunction): void => {
  console.log('enter resolveProductHandler');
  const productId = req.params.id;
  if (!handlers.isValidUuid(productId)) {
    res.sendStatus(400);
    return;
  }

  const productIndex = products.findIndex((p) => p.id === productId);
  if (productIndex < 0) {
    res.sendStatus(404);
    return;
  }
  res.locals.productIndex = productIndex;
  res.locals.product = products[productIndex];
  next();
};

router.get('/', (req, res) => {
  console.log('enter route.get(/)');

  res.send(products);
});

router.get('/:id', resolveProductHandler, (req, res) => {
  console.log('enter route.get(/:id)');
  const product = req.body as IProduct;

  res.send(product);
});

router.post('/', handlers.validateNameHandler, (req, res) => {
  console.log('enter route.post(/)');
  const product = req.body as IProduct;
  product.id = generateId();
  products.push(product);

  res.status(201).send(product);
});

router.put('/:id', handlers.validateNameHandler, resolveProductHandler, (req, res) => {
  console.log('enter route.put(/:id)');
  const product = req.body as IProduct;
  product.id = res.locals.product.id;
  Object.assign(res.locals.product, product);

  res.send(products);
});

router.delete('/:id', resolveProductHandler, (req, res) => {
  console.log('enter route.delete(/:id)');
  products.splice(res.locals.productIndex, 1);

  res.sendStatus(204);
});

export { router };

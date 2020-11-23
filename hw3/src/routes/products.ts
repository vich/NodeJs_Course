import { NextFunction, Request, Response, Router } from 'express';
import { generateId } from '../utils/id-helper';

interface Product {
  id: string;
  categoryId: string;
  name: string;
  itemsInStock: number;
}

const products: Product[] = [];

const router = Router();

const resolveProductHandler = (req: Request, res: Response, next: NextFunction): void => {
  const productId = req.params.id;
  const productIndex = products.findIndex((p) => p.id === productId);
  if (productIndex < 0) {
    res.sendStatus(404);
    return;
  }
  res.locals.productIndex = productIndex;
  res.locals.product = products[productIndex];
  next();
};

router.get('/', (req, res) => res.send(products));

router.get('/:id', resolveProductHandler, (req, res) => res.send(products));

router.post('/', (req, res) => {
  const product = req.body as Product;
  product.id = generateId();
  products.push(product);
  res.status(201).send(product);
});

router.put('/:id', resolveProductHandler, (req, res) => {
  const product = req.body as Product;
  product.id = res.locals.product.id;
  Object.assign(res.locals.product, product);

  res.send(products);
});

router.delete('/:id', resolveProductHandler, (req, res) => {
  products.splice(res.locals.productIndex, 1);

  res.sendStatus(204);
});

export { router };

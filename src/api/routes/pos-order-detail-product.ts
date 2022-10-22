import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import controller from '../controllers/pos-order-detail-product';
const route = Router();

export default (app: Router) => {
  app.use('/pos-order-detail-product', route);

  route.get('/', controller.findAll);
  route.post('/', controller.create);
  route.get('/:id', controller.findOne);
  route.post('/find', controller.findBy);
  route.post('/findsomeorders', controller.findByOrd);
  route.post('/update', controller.update);
  route.delete('/:id', controller.deleteOne);
};

import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import controller from '../controllers/pos-product';
const route = Router();

export default (app: Router) => {
  app.use('/pos-product', route);

  route.get('/', controller.findAll);
  route.post('/', controller.create);
  route.get('/:id', controller.findOne);
  route.post('/find', controller.findBy);
  route.post('/update', controller.update);
  route.delete('/:id', controller.deleteOne);
};

import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import controller from '../controllers/item-model';
const route = Router();

export default (app: Router) => {
  app.use('/item-models', route);

  route.get('/', controller.findAll);
  route.post('/', controller.create);
  route.post('/find', controller.findBy);
  route.post('/findOne', controller.findByOne);
  route.get('/:id', controller.findOne);
  route.put('/:id', controller.update);
  
};

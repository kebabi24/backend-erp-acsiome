import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import controller from '../controllers/item';
const route = Router();

export default (app: Router) => {
  app.use('/items', route);

  route.get('/', controller.findAll);
  route.post('/', controller.create);
  route.post('/find', controller.findBy);
  route.post("/findspec", controller.findBySpec)
  route.post('/findsupp', controller.findBySupp);
  route.post('/findOne', controller.findByOne);
  route.get('/:id', controller.findOne);
  route.post('/findprod', controller.findProd);
  route.post('/stk', controller.findAllwithstk);
  route.put('/:id', controller.update);
};

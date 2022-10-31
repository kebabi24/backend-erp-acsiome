import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import controller from '../controllers/customer';
const route = Router();

export default (app: Router) => {
  app.use('/customers', route);

  route.get('/', controller.findAll);
  route.post('/', controller.create);
  route.get('/:id', controller.findOne);
  route.post('/find', controller.findBy);
  route.post('/findsolde', controller.getSolde);
  route.post('/findall', controller.findByAll);
  route.put('/:id', controller.update);
  route.delete('/:id', controller.deleteOne);
  route.post('/cmPos', controller.createCmPos);
};

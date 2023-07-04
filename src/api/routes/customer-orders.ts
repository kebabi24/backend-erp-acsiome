import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import controller from '../controllers/customer-orders';
const route = Router();

export default (app: Router) => {
  app.use('/customer-orders', route);

  route.get('/', controller.findAll);

  route.post('/find', controller.findBy);

  route.post('/findall', controller.findByAll);
  route.post('/getData', controller.getData);
};

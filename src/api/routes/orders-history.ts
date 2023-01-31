import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import controller from '../controllers/orders-history';
const route = Router();

export default (app: Router) => {
  app.use('/orders-history', route);

  route.get('/', controller.findAll);
  route.post('/', controller.create);
};

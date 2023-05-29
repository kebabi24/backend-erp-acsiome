import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import controller from '../controllers/printers';
const route = Router();

export default (app: Router) => {
  app.use('/printers', route);

  route.post('/', controller.create);
  route.get('/', controller.findAll);
};

import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import controller from '../controllers/printers';
const route = Router();

export default (app: Router) => {
  app.use('/printers', route);

  route.post('/', controller.create);
  route.post('/affectPrinters', controller.affectPrinters);
  route.get('/', controller.findAll);
  route.post('/find', controller.findBy);
};

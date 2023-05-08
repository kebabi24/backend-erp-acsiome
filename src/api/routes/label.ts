import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import controller from '../controllers/label';
const route = Router();

export default (app: Router) => {
  app.use('/labels', route);

  route.post('/', controller.create);
  route.get('/', controller.findAll);
  route.get('/:id', controller.findOne);
  route.post('/find', controller.findBy);
  route.put('/:id', controller.update);
};

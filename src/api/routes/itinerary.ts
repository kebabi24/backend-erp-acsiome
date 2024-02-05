import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import controller from '../controllers/itinerary';
const route = Router();

export default (app: Router) => {
  app.use('/itinerary', route);

  route.get('/', controller.findAll);
  route.post('/', controller.create);
  route.get('/:id', controller.findOne);
  route.post('/find', controller.findBy);
  route.post('/getservices', controller.getAllServices);
  route.put('/:id', controller.update);
  route.delete('/:id', controller.deleteOne);
};

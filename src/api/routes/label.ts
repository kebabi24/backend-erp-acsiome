import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import controller from '../controllers/label';
const route = Router();

export default (app: Router) => {
  app.use('/labels', route);

 
  route.post('/createlab', controller.createlAB);
  route.post('/prod', controller.createProd);
  route.post('/prodpal', controller.createPAL);
  route.post('/allocation', controller.addAllocation);
  
  route.get('/:id', controller.findOne);
  route.post('/find', controller.findBy);
  route.post('/findby', controller.findByAll);
  route.put('/:id', controller.update);
  route.post('/upd', controller.updated);
  route.post('/', controller.create);
  route.get('/', controller.findAll);
};

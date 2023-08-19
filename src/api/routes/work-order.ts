import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import controller from '../controllers/work-order';
const route = Router();

export default (app: Router) => {
  app.use('/work-orders', route);

  route.get('/', controller.findAll);
  route.post('/', controller.create);
  route.post('/createdirect', controller.createDirect);
  route.post('/createsojob', controller.createSoJob);
  route.post('/createwopos', controller.createPosWorkOrder);
  route.get('/:id', controller.findOne);
  route.post('/find', controller.findBy);
  route.post('/findOne', controller.findByOne);
  route.put('/:id', controller.update);
  route.delete('/:id', controller.deleteOne);
  route.post('/calccost', controller.CalcCost);
  route.post('/calccostwo', controller.CalcCostWo);
};

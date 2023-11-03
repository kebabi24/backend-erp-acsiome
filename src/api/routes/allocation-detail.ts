import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import controller from '../controllers/allocation-detail';
const route = Router();

export default (app: Router) => {
  app.use('/allocation-details', route);

  route.get('/', controller.findAll);
  route.post("/", controller.create)
  route.post('/find', controller.findBy);

  route.post('/findall', controller.findByAll);
  route.post('/getData', controller.getData);
};

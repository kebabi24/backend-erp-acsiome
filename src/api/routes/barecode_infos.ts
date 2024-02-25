import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import controller from '../controllers/barecode_infos';
const route = Router();

export default (app: Router) => {
  app.use('/barecodeinfos', route);

  route.post('/', controller.create);
  route.get('/:id', controller.findOne);
  route.put('/:id', controller.update);
  route.post('/find', controller.findBy);
  route.get('/', controller.findAll);
  
};

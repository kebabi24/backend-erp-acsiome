import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import controller from '../controllers/pos-order';
const route = Router();

export default (app: Router) => {
  app.use('/pos-order', route);

  route.get('/findw', controller.findAlll);
  route.post('/findall', controller.findAll);
  route.post('/', controller.create);
  route.get('/:id', controller.findOne);
  route.post('/find', controller.findBy);
  route.post('/findsumqty', controller.findSumQty);
  route.post('/findsumamt', controller.findSumAmt);
  route.post('/findsomeorders', controller.findByOrd);
  route.post('/update', controller.update);
  route.delete('/:id', controller.deleteOne);
  route.post('/findorder', controller.findByOrd);
};

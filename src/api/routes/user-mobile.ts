import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import controller from '../controllers/user-mobile';
const route = Router();

export default (app: Router) => {
  app.use('/users-mobile', route);

  route.get('/', controller.findAll);
  route.get('/findAllwithDetails', controller.findAllwithDetails);
  route.post('/', controller.create);
  route.get('/:user_mobile_code', controller.findOne);
  route.post('/find', controller.findBy);
  route.post('/findone', controller.findByOne);
  route.put('/up:user_mobile_code', controller.updated);
  route.put('/:user_mobile_code', controller.update);
  route.delete('/:user_mobile_code', controller.deleteOne);
  route.post('/signin', controller.signin);
  route.post('/getData', controller.getDataBack);
  route.post('/getDataTest', controller.getDataBackTest);
  route.post('/getAllInvoice', controller.findAllInvoice);
};

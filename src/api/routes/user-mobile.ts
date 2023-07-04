import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import controller from '../controllers/user-mobile';
const route = Router();

export default (app: Router) => {
  app.use('/users-mobile', route);
  
  route.post('/getAllVisit', controller.findVisitBy);
  route.get('/findAllwithDetails', controller.findAllwithDetails);
  route.get('/findterms', controller.findPaymentterm)
  route.get('/findvisits', controller.findAllVisits)
  
  route.get('/:user_mobile_code', controller.findOne);
  route.get('/getPassword/:user_mobile_code', controller.findUserPassword);
  route.post('/find', controller.findBy);
  route.post('/findone', controller.findByOne);
  route.put('/up:user_mobile_code', controller.updated);
  route.put('/:user_mobile_code', controller.update);
  route.delete('/:user_mobile_code', controller.deleteOne);
  route.post('/signin', controller.signin);
  route.post('/getData', controller.getDataBack);
  route.post('/getDataTest', controller.getDataBackTest);
  route.post('/getAllInvoices', controller.findAllInvoice);
  route.post('/getInvoiceLines', controller.findByInvoiceLine);
  route.post('/getAllPayment', controller.findPaymentBy);
  
  route.get('/', controller.findAll);
  route.post('/', controller.create);
  
};

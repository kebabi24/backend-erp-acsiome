import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import controller from '../controllers/user-mobile';
const route = Router();

export default (app: Router) => {
  app.use('/users-mobile', route);
  
  route.post('/getAllVisit', controller.findVisitBy);
  route.post('/getAllVisitrole', controller.findVisitByRole);
  route.get('/findAllwithDetails', controller.findAllwithDetails);
  // route.get('/getVisits/', controller.getAllVisits);
  route.post('/', controller.create);
  route.get('/findterms', controller.findPaymentterm)
  route.get('/findrolebyuser', controller.findRoleByuser)
  route.get('/findvisits', controller.findAllVisits)
  route.get('/testHash', controller.testHash)
  route.post('/getDashboardData', controller.getDashboardAddData)

  route.post('/getSalesDashboardData', controller.getSalesDashboardAddData)
  
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
  route.post('/getAllPaymentByRole', controller.findPaymentByRole);
  route.post('/getAllPaymentService', controller.findPaymentByService),
  route.post('/getAllInvoicesdet', controller.findAllInvoicewithDetails);
  route.post('/getsalesrole', controller.findAllSalesRole);
  route.post('/getAllInvoicesdetrole', controller.findAllInvoicewithDetailsRole);
  route.get('/', controller.findAll);
  route.post('/', controller.create);
  route.post('/getAllInvoicesRole', controller.findAllInvoiceRole);
  route.post('/getAllCreditsRole', controller.findAllCreditRole);
  route.post('/getAllCredits', controller.findAllCredit);
  route.post('/findallca', controller.findAllCA);
  route.post('/findsalestype', controller.findSalesType);
  route.post('/findsalesroletype', controller.findSalesRoleType);
  route.post('/findallsalesrole', controller.findAllSalesRoles)
  route.post('/getAllInvoicesdetInv', controller.findAllInvoicewithDetailsToinv);
  route.post('/adddinv', controller.addDinvoices);
  route.post('/getAllInvoicesAcc', controller.findAllInvoiceAcc);
  route.post('/getInvoiceLinesAcc', controller.findByInvoiceLineAcc);
  route.post('/getAllInvoicesdetAcc', controller.findAllInvoicewithDetailsAcc);
};

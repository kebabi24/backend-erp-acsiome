import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import controller from '../controllers/bank';
const route = Router();

export default (app: Router) => {
  app.use('/banks', route);

 
  route.post('/', controller.create);
  route.get("/findtransfert",controller.findTransfertBy)
  route.get('/:id', controller.findOne);
  route.post('/ar', controller.findAR);
  route.post('/ap', controller.findAP);

  route.put('/:id', controller.update);
  route.post('/find', controller.findBy);
  route.post('/findbankuser', controller.findBankByUser);
  route.post('/findbyall', controller.findByAll);
  route.put('/P:id', controller.updatedet);
  route.post('/findDetails', controller.findAllDetails);
  route.post('/findBk', controller.findBkByUser);
  route.post('/bk', controller.Bk);
  route.post('/prP', controller.proccesPayement);
  route.post('/createFRequest', controller.createFRequest);
  route.post('/findbankgrp', controller.findBkhGrp);
  route.post('/addbkhtransfert', controller.bkhTr);
  route.post('/addbkhpayment', controller.bkhP);
  route.post('/addbkhpaymentdet', controller.bkhPDet);
  route.post('/addbkhcautiondet', controller.bkhCautionDet);
  route.post('/addbkhtransfertc', controller.bkhTrC);
  route.post('/addbkhtransfertcdet', controller.bkhTrCDet);
  route.post('/findbkh', controller.findBKHBy);
  route.post('/findbkhtr', controller.findBKHTRBy);
  route.post('/findbkhrct', controller.findBKHRCTBy);
  route.post('/findtrbk', controller.findBKHTR);
  route.post('/findbkhtrgrp', controller.findBKHTRGRP);
  route.post('/findbkhgrptr', controller.findBKHGrpTRBy);
  route.get('/', controller.findAll);
  
};

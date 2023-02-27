import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import controller from '../controllers/bank';
const route = Router();

export default (app: Router) => {
  app.use('/banks', route);

  route.get('/', controller.findAll);
  route.post('/', controller.create);
  route.get('/:id', controller.findOne);
  route.post('/ar', controller.findAR);
  route.post('/ap', controller.findAP);

  route.put('/:id', controller.update);
  route.post('/find', controller.findBy);
  route.put('/P:id', controller.updatedet);
  route.post('/findDetails', controller.findAllDetails);
  route.post('/findBk', controller.findBkByUser);
  route.post('/bk', controller.Bk);
  route.post('/prP', controller.proccesPayement);
  route.post('/createFRequest', controller.createFRequest);
  route.post('/findbankgrp', controller.findBkhGrp);
  route.post('/addbkhtransfert', controller.bkhTr);
};

import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import controller from '../controllers/work-order';
const route = Router();

export default (app: Router) => {
  app.use('/work-orders', route);

  route.get('/', controller.findAll);
  route.post('/', controller.create);
  route.post('/createdirect', controller.createDirect);
  route.post('/findwo', controller.findBywo);
  route.post('/createsojob', controller.createSoJob);
  route.post('/createsfjob', controller.createSfJob);
  route.post('/createwopos', controller.createPosWorkOrder);
  route.get('/:id', controller.findOne);
  route.post('/find', controller.findBy);
  route.post('/findbroyage', controller.findBybroyage);
  route.post('/findextrusion', controller.findByextrusion);
  route.post('/findthermoformage', controller.findBythermo);
  route.post('/findprogram', controller.findByPrograms);
  route.post('/findDistinct', controller.findByDistinct);
  route.post('/findbrrep', controller.findByRPBR);
  route.post('/findexrep', controller.findByEXBR);
  route.post('/findbrrecap', controller.findByRecapBR);
  route.post('/findOne', controller.findByOne);
  route.put('/:id', controller.update);
  route.delete('/:id', controller.deleteOne);
  route.post('/calccost', controller.CalcCost);
  route.post('/calccostwo', controller.CalcCostWo);
};

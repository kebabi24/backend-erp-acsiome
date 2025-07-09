import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import controller from '../controllers/purchase-receive';
const route = Router();

export default (app: Router) => {
  app.use('/purchase-receives', route);
  route.get('/group', controller.findGroup);
  route.get('/', controller.findAll);
  route.post('/', controller.create);
  route.post('/cab', controller.createCab);
  route.post('/cabdet', controller.createCabDet);
  route.post('/:distinct/:liste', controller.findAllDistinct);
  route.post('/distinct', controller.findDistinct);
  route.post('/grouprcp', controller.findGroupRCP);
  route.get('/:id', controller.findOne);
  route.post('/find', controller.findBy);
  route.put('/:id', controller.update);
  route.delete('/:id', controller.deleteOne);
  route.post('/rct-po', controller.rctPo);
  route.post('/findbytr', controller.findByTr);
  route.post('/groupamt', controller.findGroupAmt);
  route.put('/UNR/:prhnbr', controller.Unreceip);
  route.post('/grouprcpcancel', controller.findGroupRCPCancel);
};

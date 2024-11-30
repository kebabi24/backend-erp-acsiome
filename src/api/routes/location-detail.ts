import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import controller from '../controllers/location-detail';
const route = Router();

export default (app: Router) => {
  app.use('/location-details', route);

  route.get('/', controller.findAll);
  route.post('/', controller.create);
  route.post('/createldpos', controller.createldpos);
  route.get('/:id', controller.findOne);
  route.post('/find', controller.findBy);
  route.post('/findonestatus', controller.findByOneStatus);
  route.post('/findone', controller.findByOne);
  route.post('/findoneref', controller.findByOneRef);
  route.post('/findfifo', controller.findByFifo);
  route.post('/findfifolot', controller.findByFifoLot);
  route.post('/findother', controller.findOtherStatus);
  route.put('/:id', controller.update);
  route.post('/up', controller.updateS);
  route.delete('/:id', controller.deleteOne);
  route.post('/findWeekProduct', controller.findByWeek);
  route.post('/findinstance', controller.findStatusInstance);
  route.post('/findbyprice', controller.findByPrice);
  route.post('/findbypricerole', controller.findByPriceRole);
  
  
};

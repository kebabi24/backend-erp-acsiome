import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import controller from '../controllers/item';
const route = Router();

export default (app: Router) => {
  app.use('/items', route);

  route.get('/', controller.findAll);
  route.get("/findpart", controller.findPart)
  route.get('/training/', controller.findAllTraining);
  route.post('/', controller.create);
  route.post('/find', controller.findBy);
  route.post('/findpurchasing', controller.findByPurchase);
  route.post('/findwithperte', controller.findBywithperte);
  route.post('/findop', controller.findByOp);
  route.post("/findspec", controller.findBySpec)
  route.post('/findsupp', controller.findBySupp);
  route.post('/findOne', controller.findByOne);
  route.get('/:id', controller.findOne);
  route.get("/det/:id", controller.findOneDet)
  route.post('/findprod', controller.findProd);
  route.post('/stk', controller.findAllwithstk);
  route.post('/itemstk', controller.findAllItemswithstk);
  route.put('/:id', controller.update);
  route.post('/calccmp', controller.CalcCmp);
  route.post('/findlast', controller.findlast);
  route.post("/detail", controller.createDetail);
  route.post("/finddettr", controller.findByDetTr);
  route.put('/updated/:id', controller.updateDet);
  route.post('/findjob', controller.findJob);
  route.post('/updateprice', controller.updatePrice);
  route.delete("/:id", controller.deleteOne)
  
};

import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import controller from '../controllers/purchase-order';
const multer = require('multer');
const upload = multer({ dest: './uploads/' });
const route = Router();

export default (app: Router) => {
  app.use('/purchase-orders', route);

  route.post('/', controller.create);
  route.post('/add', controller.createPos);
  route.get('/', controller.findAll);
  route.get('/allwithdetail', controller.findAllwithDetails);
  route.post('/allwithdetailsite', controller.findAllwithDetailsite);
  route.get('/:id', controller.findOne);
  route.post('/find', controller.findBy);
  route.post('/findStat', controller.findByStat);
  route.post('/findsite', controller.findAllSite);
  route.post('/findrange', controller.findByrange);
  route.post('/findproviderca', controller.getProviderCA);
  route.post('/findprovideractivity', controller.getProviderActivity);
  route.post('/findproviderbalance', controller.getProviderBalance);
  route.put('/:id', upload.single('file'),controller.update);
  route.post('/findAll', controller.findByAll);
  route.post('/createposunp', controller.createPosUnp);
  route.post('/createposunpp', controller.createPosUnpp);
  route.post('/findAllpodRec', controller.getPodRec);
  route.post('/findAllpo', controller.findAllPo);
  route.post('/payPo', controller.payPo);
  route.put("/up/:id", controller.updated)
};

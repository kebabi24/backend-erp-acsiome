import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import controller from '../controllers/item';
const route = Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the destination folder for uploads
    // Ensure this folder exists in your project directory
    cb(null, './uploads/'); 
  },
  filename: function (req, file, cb) {
    // Use the original file name
    // Optionally, you can add a timestamp or unique suffix to prevent overwrites
    // cb(null, Date.now() + '_' + file.originalname); 
    cb(null, file.originalname);
  }
});
// const upload = multer({ dest: './uploads/' });
const upload = multer({ storage: storage });

export default (app: Router) => {
  app.use('/items', route);
  route.get('/', controller.findAll);
  route.get("/findpart", controller.findPart)
  route.get('/training/', controller.findAllTraining);
  route.post('/findprodimg', controller.findProdImg);
  route.post('/', upload.single('file'), controller.create);
  route.post('/find', controller.findBy);
  route.post('/findtaille', controller.findBytaille);
  route.post('/findpurchasing', controller.findByPurchase);
  route.post('/findwithperte', controller.findBywithperte);
  route.post('/findop', controller.findByOp);
  route.post("/findspec", controller.findBySpec)
  route.post('/findsupp', controller.findBySupp);
  route.post('/findOne', controller.findByOne);
  route.post('/findOnestk', controller.findByOneStk);
  route.get('/:id', controller.findOne);
  route.get("/det/:id", controller.findOneDet)
 
  
  route.post('/findprod', controller.findProd);
  route.post('/stk', controller.findAllwithstk);
  route.post('/stknotnull', controller.findAllwithstk0);
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
  route.post('/epiUpdate', controller.epiUpdate);
  
 
};

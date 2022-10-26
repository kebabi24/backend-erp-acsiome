import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import controller from '../controllers/purchase-order';
const route = Router();

export default (app: Router) => {
  app.use('/purchase-orders', route);

    route.post("/", controller.create)
    route.post("/add", controller.createPos)
    route.get("/", controller.findAll)
    route.get("/allwithdetail", controller.findAllwithDetails)
    route.post("/allwithdetailsite", controller.findAllwithDetailsite)
    route.get("/:id", controller.findOne)
    route.post("/find", controller.findBy)
    route.post("/findStat", controller.findByStat)
    route.post("/findsite", controller.findAllSite)
    route.post("/findrange", controller.findByrange)
    route.post("/findproviderca", controller.getProviderCA)
    route.post("/findprovideractivity", controller.getProviderActivity)
    route.post("/findproviderbalance", controller.getProviderBalance)
    route.put("/:id", controller.update)
    route.post("/findAll", controller.findByAll)
    
}

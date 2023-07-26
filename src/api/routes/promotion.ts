import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import controller from '../controllers/promotion';
const route = Router();

export default (app: Router) => {
    app.use("/promo", route)

    
    route.post("/createPopArt", controller.createPopulationArticle)
    route.post("/createAdv", controller.createAdvantage)
    route.post("/createPromo", controller.createPromotion)
    route.get("/getPopsArt", controller.findPopulationsArticle)
  
}

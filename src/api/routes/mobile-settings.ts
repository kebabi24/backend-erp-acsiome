import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/mobile-settings"
const route = Router()

export default (app: Router) => {
    app.use("/mobile-settings", route)

    route.post("/sumbitVisitResultsData", controller.submitVisitResultData)
    route.post("/createCancelReasons", controller.createCancelationReasons)
    route.post("/createPaymentMethods", controller.createPaymentMethods)
    route.get("/getVisitList", controller.getVisitList)
    route.get("/paymentMethods", controller.getPaymentMethods)
    route.get("/cancelationReasons", controller.getCanelationReasons)
    
}

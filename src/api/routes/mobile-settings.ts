import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/mobile-settings"
const route = Router()

export default (app: Router) => {
    app.use("/mobile-settings", route)

    route.post("/sumbitVisitResultsData", controller.submitVisitResultData)
    route.get("/getVisitList", controller.getVisitList)
    
}

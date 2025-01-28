import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/price-list-quantity"
const route = Router()

export default (app: Router) => {
    app.use("/pricelistss", route)

    
    route.post("/", controller.create)
    route.get("/", controller.findAll)
    route.get("/:id", controller.findOne)
    route.post("/find", controller.findBy)
    route.post("/findOne", controller.findByOne)
    route.post("/finddet", controller.findByDet)
    route.put("/:id", controller.update)
}

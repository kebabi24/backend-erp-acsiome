import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/voucher-order"
const route = Router()

export default (app: Router) => {
    app.use("/voucher-orders", route)

    route.post("/", controller.create)
    //route.post("/direct", controller.createdirect)
    route.get("/", controller.findAll)
    route.get("/allwithdetail", controller.findAllwithDetails)
    route.get("/:id", controller.findOne)
    route.post("/find", controller.findBy)
    route.post("/findOne", controller.findByOne)
    route.put("/:id", controller.update)
    route.post("/findAll", controller.findByAll)
    
}

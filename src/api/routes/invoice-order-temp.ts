import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/invoice-order-temp"
const route = Router()

export default (app: Router) => {
    app.use("/invoice-order-temps", route)

    route.post("/", controller.create)
    route.post("/createiv", controller.createIV)
    route.post("/imput", controller.imput)
    route.post("/imputproject", controller.imputProject)
    route.get("/", controller.findAll)
    route.get("/allwithdetail", controller.findAllwithDetails)
    route.get("/:id", controller.findOne)
    route.post("/find", controller.findBy)
    route.put("/:id", controller.update)
    route.post("/findAll", controller.findByAll)
    
}

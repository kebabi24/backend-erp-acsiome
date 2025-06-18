import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/ddinvoice"
const route = Router()

export default (app: Router) => {
    app.use("/ddinvoices", route)

    route.post("/", controller.create)
    route.get("/", controller.findAll)
    route.post("/allwithdetail", controller.findAllwithDetails)
    route.get("/:id", controller.findOne)
    route.post("/find", controller.findBy)
    route.post("/findone", controller.findByOne)
    route.put("/:id", controller.update)
    route.post("/findAll", controller.findByAll)
    
}

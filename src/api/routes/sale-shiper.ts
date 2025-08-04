import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/sale-shiper"
const route = Router()


export default (app: Router) => {
    app.use("/sale-shipers", route)

    route.post("/", controller.create)
    route.get("/", controller.findAll)
    route.put("/:distinct", controller.findAllDistinct)
    route.get("/:id", controller.findOne)
    route.post("/find", controller.findBy)
    route.post("/findallby", controller.findAllBy)
    
    route.put("/:id", controller.update)
    route.delete("/:id", controller.deleteOne)
}

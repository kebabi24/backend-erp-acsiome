import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/service-mobile"
const route = Router()

export default (app: Router) => {
    app.use("/service", route)

    route.get("/", controller.findAll)
    route.post("/", controller.create)
    route.get("/:id", controller.findOne)
    route.post("/find", controller.findBy)
    route.post("/findby", controller.findByAll)
    route.put("/close/:service_code", controller.closeService)
    route.put("/:id", controller.update)
   
    route.delete("/:id", controller.deleteOne)
}

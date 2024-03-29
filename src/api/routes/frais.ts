import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/frais"
const route = Router()

export default (app: Router) => {
    app.use("/fraiss", route)

   
    route.post("/", controller.create)
    route.get("/:id", controller.findOne)
    route.post("/find", controller.findBy)
    route.put("/:id", controller.update)
    route.delete("/:id", controller.deleteOne)
    route.post("/findAll", controller.findByAll)
    route.get("/", controller.findAll)
}

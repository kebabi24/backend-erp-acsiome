import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/populationemploye"
const route = Router()

export default (app: Router) => {
    app.use("/populationemployes", route)
    route.get("/findall", controller.finddistc)
    route.get("/", controller.findAll)
    route.post("/", controller.create)
    route.get("/:id", controller.findOne)
    route.post("/find", controller.findBy)
    route.put("/P", controller.update)
    route.delete("/:id", controller.deleteOne)
}

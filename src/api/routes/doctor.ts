import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/doctor"
const route = Router()

export default (app: Router) => {
    app.use("/doctors", route)

    route.get("/", controller.findAll)
    route.post("/", controller.create)
    route.get("/:id", controller.findOne)
    route.post("/find", controller.findBy)
    route.post("/findone", controller.findByOne)
    route.put("/:id", controller.update)
    route.delete("/:id", controller.deleteOne)
}

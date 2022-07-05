import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/config"
const route = Router()

export default (app: Router) => {
    app.use("/configs", route)
    route.get("/", controller.findAll)
    route.get("/:id", controller.findOne)
    route.post("/", controller.create)
    route.post("/find", controller.findBy)
    route.put("/:id", controller.update)
}

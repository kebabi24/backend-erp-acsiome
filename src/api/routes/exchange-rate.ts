import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/exchange-rate"
const route = Router()

export default (app: Router) => {
    app.use("/exchange-rates", route)

    route.post("/", controller.create)
    route.get("/", controller.findAll)
    route.get("/:id", controller.findOne)
    route.post("/find", controller.findBy)
    route.post("/findOne", controller.findByOne)
    route.post("/getExRate", controller.getExRate)
    route.put("/:id", controller.update)
}

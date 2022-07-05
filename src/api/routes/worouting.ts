import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/worouting"
const route = Router()

export default (app: Router) => {
    app.use("/woroutings", route)

    route.get("/", controller.findAll)
    route.post("/", controller.create)
    route.get("/:id", controller.findOne)
    route.post("/find", controller.findBy)
    route.put("/:id", controller.update)
    route.delete("/:id", controller.deleteOne)
}

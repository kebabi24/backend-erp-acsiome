import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/costcenter"
const route = Router()

export default (app: Router) => {
    app.use("/costcenters", route)

    route.get("/", controller.findAll)
    route.post("/", controller.create)
    route.get("/:id", controller.findOne)
    route.post("/find", controller.findBy)
    route.post("/finddet", controller.findByDet)
    route.put("/:id", controller.update)
}

import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/forcast"
const route = Router()

export default (app: Router) => {
    app.use("/forcasts", route)

    route.post("/", controller.create)
    route.get("/", controller.findAll)
    route.get("/:id", controller.findOne)
    route.post("/find", controller.findBy)
    route.post("/findOne", controller.findByOne)
    route.put("/", controller.update)
    route.delete("/:id", controller.deleteOne)
}

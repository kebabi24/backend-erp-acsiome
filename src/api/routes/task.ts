import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/task"
const route = Router()

export default (app: Router) => {
    app.use("/tasks", route)

    
    route.post("/", controller.create)
    route.get("/allwithdetail", controller.findAllwithDetails)
    route.get("/", controller.findAll)
    route.get("/:id", controller.findOne)
    route.post("/find", controller.findBy)
    route.post("/price", controller.findPrice)
    route.put("/:id", controller.update)
    route.post("/cost", controller.findCost)
}

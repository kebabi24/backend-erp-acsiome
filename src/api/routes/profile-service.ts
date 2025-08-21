import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/profile-service"
const route = Router()

export default (app: Router) => {
    app.use("/profileservices", route)

    
    route.post("/", controller.create)
    route.get("/", controller.findAll)
    route.get("/:id", controller.findOne)
    route.post("/find", controller.findBy)
    route.put("/:code", controller.update)
}

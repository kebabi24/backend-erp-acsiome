import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/patient"
const route = Router()

export default (app: Router) => {
    app.use("/patients", route)

    route.get("/", controller.findAll)
    route.post("/find", controller.findBy)
    route.post("/", controller.create)
    route.get("/:id", controller.findOne)
    route.put("/:id", controller.update)
    route.delete("/:id", controller.deleteOne)
 
}

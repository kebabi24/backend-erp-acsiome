import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/employe-time"
const route = Router()

export default (app: Router) => {
    app.use("/employe-times", route)

    route.get("/", controller.findAll)
    route.post("/", controller.create)
    route.post("/C", controller.createPoint)
    route.get("/:id", controller.findOne)
    route.post("/find", controller.findBy)
    route.put("/:id", controller.update)
   
    
}

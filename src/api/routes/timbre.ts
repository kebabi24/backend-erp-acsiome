import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/timbre"
const route = Router()

export default (app: Router) => {
    app.use("/timbres", route)

    
    route.post("/", controller.create)  
    route.get("/", controller.findAll)
    route.get("/:id", controller.findOne)
    route.post("/find", controller.findBy)
    route.post("/findtimbre", controller.findRange)
    route.put("/:id", controller.update)
}
